import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Step, Stepper, StepLabel, StepContent, } from 'material-ui/Stepper';

import {isLargeScreen} from '../constants/global';
import * as actions from '../actions';
import {ADD_WINE} from '../constants/ActionTypes';
import {WINE_TYPES, WINE_CATEGORIES, DEFAULT_TYPE, DEFAULT_CATEGORY} from '../constants/WineTypes';
import * as BottleTypes from '../constants/BottleTypes';
import FieldsStep from '../components/AddSteps/FieldsStep';
import TypesStep from '../components/AddSteps/TypesStep';
import PictureStep from '../components/AddSteps/PictureStep';
import PositionStep from '../components/AddSteps/PositionStep';
import ResizingComponent from '../components/ResizingComponent';

const STEPS = [{
    label: 'Informations',
    disableNext: (state) => {
        const {
            name,
            wineFamily,
            year
        } = state;
        return !name || !wineFamily || !year;
    }
}, {
    label: 'Type',
    disableNext: (state) => false
}, {
    label: 'Photo',
    disableNext: (state, props) => {
        return !props.upload.isUploaded;
    }
}, {
    label: 'Position',
    disableNext: (state) => {
        return false;
    }
}];

function getInitialState() {
    return {
      stepIndex: 0,
      name: '',
      year: '',
      wineType: Object.keys(WINE_TYPES)[DEFAULT_TYPE],
      wineCategory: WINE_TYPES[Object.keys(WINE_TYPES)[DEFAULT_TYPE]].categories[DEFAULT_CATEGORY],
      bottleType: BottleTypes.DEFAULT_TYPE.toString(),
      orientation: isLargeScreen() ? 'horizontal' : 'vertical'
    }
}

class Add extends ResizingComponent {
    state = getInitialState()

    componentWillReceiveProps(nextProps) {
        if (nextProps.notification && nextProps.notification.success && nextProps.notification.type === ADD_WINE) {
            this.setState({...getInitialState(), wineFamily: ''});
        }
    }

    updateLayout() {
        this.setState({
            orientation: isLargeScreen() ? 'horizontal' : 'vertical'
        });
    }

    handleAddWine() {
        const { dispatch, selectedCells } = this.props;
        const { blur, thumbnailFileName, pictureFileName } = this.props.upload;
        const {name, bottleType, wineCategory, wineFamily, wineType, year} = this.state;
        const wineBottles = Object.keys(selectedCells).reduce((bottles, boxId) => {
            const cellsList = selectedCells[boxId];
            cellsList.forEach(cellId => {
                bottles.push({
                    box: parseInt(boxId),
                    cell: cellId
                })
            });
            return bottles;
        }, []);
        const wine = {
            name: this.state.name,
            wineFamily: wineFamily.id,
            bottles: wineBottles,
            year,
            bottleType,
            wineCategory,
            wineType,
            blur,
            thumbnailFileName,
            pictureFileName
         };
        dispatch(actions.createWine(wine));
    }

    handleWineType = (event, wineType) => {
        this.setState({
            wineType: wineType,
            wineCategory: WINE_TYPES[wineType].categories[0]
        });
    }

    handleWineCategory = (event, wineCategory) => {
        this.setState({
            wineCategory: wineCategory
        });
    }

    handleBottleType = (event, bottleType) => {
        this.setState({
            bottleType: bottleType
        });
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    handleYearChange = (event) => {
        this.setState({
            year: event.target.value
        });
    }

    handleWineFamilyChange = (wineFamily) => {
        this.setState({
            wineFamily: wineFamily
        });
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        if (stepIndex === STEPS.length - 1) {
            this.handleAddWine();
        } else {
            this.setState({
                stepIndex: stepIndex + 1,
            });
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    }

    renderStepActions = (step) => {
        const {stepIndex, orientation} = this.state;
        const isVertical = orientation === 'vertical';
        const nextButton = <RaisedButton
            label={stepIndex === STEPS.length - 1 ? 'Sauvegarder' : 'Suivant'}
            primary={true}
            disabled={STEPS[stepIndex].disableNext(this.state, this.props)}
            onTouchTap={this.handleNext}
        />;
        const previousButton = <FlatButton
            label="Retour"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{marginRight: 12}}
        />;

        return (
            <div style={{margin: '12px 0'}}>
                {isVertical ? nextButton : previousButton}
                {isVertical && step > 0 ? previousButton : !isVertical ? nextButton : null}
            </div>
        );
    }

    getStepContent = (stepIndex) => {
        const {name, year, wineType, wineCategory, bottleType, wineFamily} = this.state;
        let cases = [];
        cases.push(
            <FieldsStep
            name={name}
            year={year}
            onNameChange={this.handleNameChange}
            onYearChange={this.handleYearChange}
            onWineFamilyChange={this.handleWineFamilyChange}
            defaultWineFamily={wineFamily}
            />
        );
        cases.push(
            <TypesStep
                handleWineType={this.handleWineType}
                handleWineCategory={this.handleWineCategory}
                handleBottleType={this.handleBottleType}
                wineType={wineType}
                wineCategory={wineCategory}
                bottleType={bottleType}
            />
        );
        cases.push(
            <PictureStep {...this.props}/>
        );
        cases.push(
            <PositionStep {...this.props}/>
        );

        return cases[stepIndex];
    }

    render() {
        const {stepIndex, orientation} = this.state;
        const isVertical = orientation === 'vertical';
        const stepContent = this.getStepContent(stepIndex);

        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                <Stepper activeStep={stepIndex} orientation={orientation} >
                    {STEPS.map((step, index) => <Step key={index}>
                        <StepLabel>{step.label}</StepLabel>
                        { isVertical ?
                            <StepContent className="fix-me">
                              {stepContent}
                              {this.renderStepActions(stepIndex)}
                            </StepContent> : <span style={{display: 'none'}}/>
                        }
                    </Step>)}
                </Stepper>
                {
                    !isVertical &&
                    <div style={{margin: '0 16px'}}>
                        {stepContent}
                        {this.renderStepActions(stepIndex)}
                    </div>
                }

            </div>
        );
    }
}

export default connect(state => ({
    ...state.cellar,
    upload: state.upload,
    notification: state.notification
}))(Add);
