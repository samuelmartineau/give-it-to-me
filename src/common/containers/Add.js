import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

import * as actions from '../actions';
import {WINE_TYPES, WINE_CATEGORIES, DEFAULT_TYPE, DEFAULT_CATEGORY} from '../constants/WineTypes';
import * as BottleTypes from '../constants/BottleTypes';
import FieldsStep from '../components/AddSteps/FieldsStep';
import TypesStep from '../components/AddSteps/TypesStep';
import PictureStep from '../components/AddSteps/PictureStep';
import PositionStep from '../components/AddSteps/PositionStep';

class Add extends Component {
    state = {
      finished: false,
      stepIndex: 0,
      name: '',
      wineType: Object.keys(WINE_TYPES)[DEFAULT_TYPE],
      wineCategory: WINE_TYPES[Object.keys(WINE_TYPES)[DEFAULT_TYPE]].categories[DEFAULT_CATEGORY],
      bottleType: BottleTypes.DEFAULT_TYPE.toString()
    }

    handleAddWine() {
        const { dispatch, selectedCells } = this.props;
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
            bottles: wineBottles
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

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 3,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    }

 getStepContent(stepIndex) {
     const {name, wineType, wineCategory, bottleType} = this.state;
   switch (stepIndex) {
     case 0:
       return (
           <FieldsStep
            name={name}
            onNameChange={this.handleNameChange.bind(this)}/>
       )
     case 1:
       return (
           <TypesStep
            handleWineType={this.handleWineType.bind(this)}
            handleWineCategory={this.handleWineCategory.bind(this)}
            handleBottleType={this.handleBottleType.bind(this)}
            wineType={wineType}
            wineCategory={wineCategory}
            bottleType={bottleType}
            />
       )
     case 2:
       return (
         <PictureStep {...this.props}/>
       );
     case 3:
       return (
           <PositionStep {...this.props}/>
       );
   }
 }


    render() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Informations</StepLabel>
            </Step>
            <Step>
              <StepLabel>Type</StepLabel>
            </Step>
            <Step>
              <StepLabel>Photo</StepLabel>
            </Step>
            <Step>
              <StepLabel>Position</StepLabel>
            </Step>
          </Stepper>
          <div style={contentStyle}>
            {finished ? (
              <p>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({stepIndex: 0, finished: false});
                  }}
                >
                  Click here
                </a> to reset the example.
              </p>
            ) : (
              <div>
                <div>{this.getStepContent(stepIndex)}</div>
                <div style={{marginTop: 12}}>
                  <FlatButton
                    label="Back"
                    disabled={stepIndex === 0}
                    onTouchTap={this.handlePrev}
                    style={{marginRight: 12}}
                  />
                  <RaisedButton
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    primary={true}
                    onTouchTap={this.handleNext}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        );
    }
}

export default connect(state => ({
    ...state.cellar,
    upload: state.upload
}))(Add);
