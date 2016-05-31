import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Step, Stepper, StepLabel, StepContent, } from 'material-ui/Stepper';

import {isLargeScreen} from '../constants/global';
import * as actions from '../actions';
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
            wineFamily
        } = state;
        return !name || !wineFamily;
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

class Add extends ResizingComponent {
    state = {
      stepIndex: 0,
      name: '',
      wineType: Object.keys(WINE_TYPES)[DEFAULT_TYPE],
      wineCategory: WINE_TYPES[Object.keys(WINE_TYPES)[DEFAULT_TYPE]].categories[DEFAULT_CATEGORY],
      bottleType: BottleTypes.DEFAULT_TYPE.toString(),
      orientation: isLargeScreen() ? 'horizontal' : 'vertical'
    }

    updateLayout() {
        this.setState({
            orientation: isLargeScreen() ? 'horizontal' : 'vertical'
        });
    }

    handleAddWine() {
        const { dispatch, selectedCells, blur, tmpPicture, tmpThumbnail } = this.props;
        const {name, bottleType, wineCategory, wineFamily, wineType} = this.props;
        const wineBottles = Object.keys(selectedCells).reduce((bottles, boxId) => {
            const cellsList = selectedCells[boxId];
            cellsList.forEach(cellId => {
                bottles.push({
                    box: boxId,
                    cell: cellId
                })
            });
            return bottles;
        }, []);
        const wine = {
            name: this.state.name,
            bottles: wineBottles,
            bottleType: bottleType,
            wineCategory: wineCategory,
            wineFamily: wineFamily.id,
            wineType: wineType,
            blur: blur,
            tmpPicture: tmpPicture,
            tmpThumbnail: tmpThumbnail
         };
        dispatch(actions.createWine(wine));
        this.setState({
            name: ''
        });
    }

    handleWineType(wineType) {
        this.setState({
            wineType: wineType.value,
            wineCategory: WINE_TYPES[wineType.value].categories[0]
        });
    }

    handleWineCategory(wineCategory) {
        this.setState({
            wineCategory: wineCategory.value
        });
    }

    handleBottleType(bottleType) {
        this.setState({
            bottleType: bottleType.value
        });
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleWineFamilyChange(wineFamily) {
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

    renderStepActions(step) {
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

    getStepContent(stepIndex) {
        const {name, wineType, wineCategory, bottleType, wineFamily} = this.state;
        let cases = [];
        cases.push(
            <FieldsStep
            name={name}
            onNameChange={this.handleNameChange.bind(this)}
            onWineFamilyChange={this.handleWineFamilyChange.bind(this)}
            defaultWineFamily={wineFamily}
            />
        );
        cases.push(
            <TypesStep
            handleWineType={this.handleWineType.bind(this)}
            handleWineCategory={this.handleWineCategory.bind(this)}
            handleBottleType={this.handleBottleType.bind(this)}
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
        const contentStyle = {margin: '0 16px'};
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
                    <div style={contentStyle}>
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
    upload: state.upload
}))(Add);
