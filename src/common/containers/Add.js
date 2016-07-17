import React from 'react'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper'

import {isLargeScreen} from '../constants/global'
import {addWine, wineAdditionProcessing} from '../actions'
import {WINE_TYPES, DEFAULT_TYPE, DEFAULT_CATEGORY} from '../constants/WineTypes'
import * as BottleTypes from '../constants/BottleTypes'
import FieldsStep from '../components/AddSteps/FieldsStep'
import TypesStep from '../components/AddSteps/TypesStep'
import PictureStep from '../components/AddSteps/PictureStep'
import PositionStep from '../components/AddSteps/PositionStep'
import ResizingComponent from '../components/ResizingComponent'

const STEPS = [
  {
    label: 'Informations',
    disableNext: (state) => {
      const {name, wineFamily, year} = state
      return !name || !wineFamily || !year
    }
  }, {
    label: 'Type',
    disableNext: (state) => false
  }, {
    label: 'Photo',
    disableNext: (state, props) => {
      return !props.upload.isUploaded
    }
  }, {
    label: 'Position',
    disableNext: (state) => {
      return !state.isInBoxes && !state.count
    }
  }
]

function getInitialState () {
  return {
    positionComment: '',
    isInBoxes: true,
    stepIndex: 0,
    source: 'France',
    name: '',
    open: false,
    year: '',
    count: 1,
    wineType: Object.keys(WINE_TYPES)[DEFAULT_TYPE],
    wineCategory: WINE_TYPES[Object.keys(WINE_TYPES)[DEFAULT_TYPE]].categories[DEFAULT_CATEGORY],
    bottleType: BottleTypes.DEFAULT_TYPE.toString(),
    orientation: isLargeScreen()
      ? 'horizontal'
      : 'vertical'
  }
}

class Add extends ResizingComponent {
  state = getInitialState()

  componentWillReceiveProps (nextProps) {
    if (nextProps.wineAdded) {
      this.setState({
        ...getInitialState(),
        wineFamily: ''
      })
      nextProps.dispatch(wineAdditionProcessing())
    }
  }

  updateLayout () {
    this.setState({
      orientation: isLargeScreen()
        ? 'horizontal'
        : 'vertical'
    })
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleAddWine = () => {
    const {dispatch, selectedCells} = this.props
    const {blur, thumbnailFileName, pictureFileName} = this.props.upload
    const {
      name,
      bottleType,
      wineCategory,
      wineFamily,
      wineType,
      year,
      isInBoxes,
      positionComment,
      count,
      source
    } = this.state
    const wineBottles = Object.keys(selectedCells).reduce((bottles, boxId) => {
      const cellsList = selectedCells[boxId]
      cellsList.forEach(cellId => {
        bottles.push({box: parseInt(boxId), cell: cellId})
      })
      return bottles
    }, [])
    const wine = {
      isInBoxes: isInBoxes,
      name: name,
      wineFamily: wineFamily.id,
      year,
      bottleType,
      wineCategory,
      wineType,
      blur,
      thumbnailFileName,
      pictureFileName,
      source
    }
    const contextualData = {}
    if (isInBoxes) {
      contextualData.bottles = wineBottles
    } else {
      contextualData.positionComment = positionComment
      contextualData.count = count
    }
    dispatch(addWine(wine, contextualData))
  }

  handleWineType = (event, wineType) => {
    this.setState({wineType: wineType, wineCategory: WINE_TYPES[wineType].categories[0]})
  }

  handleWineCategory = (event, wineCategory) => {
    this.setState({wineCategory: wineCategory})
  }

  handleBottleType = (event, bottleType) => {
    this.setState({bottleType: bottleType})
  }

  handleNameChange = (event, value) => {
    this.setState({name: value})
  }

  handleYearChange = (event, value) => {
    this.setState({year: value})
  }

  handleWineFamilyChange = (wineFamily) => {
    this.setState({wineFamily: wineFamily})
  }

  handlePositionComment = (event, value) => {
    this.setState({positionComment: value})
  }
  handleSource = (event, value) => {
    this.setState({source: value})
  }

  handleCount = (evt, value) => {
    this.setState({count: parseInt(value)})
  }

  handleNext = () => {
    const {stepIndex} = this.state
    if (stepIndex === STEPS.length - 1) {
      this.setState({open: true})
    } else {
      this.setState({
        stepIndex: stepIndex + 1
      })
    }
  }

  handlePrev = () => {
    const {stepIndex} = this.state
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1
      })
    }
  }

  onPositionOrigin = (evt, value) => {
    this.setState({isInBoxes: value})
  }

  renderStepActions = (step) => {
    const {stepIndex, orientation} = this.state
    const isVertical = orientation === 'vertical'
    const nextButton = <RaisedButton
      label={stepIndex === STEPS.length - 1 ? 'Sauvegarder' : 'Suivant'}
      primary
      disabled={STEPS[stepIndex].disableNext(this.state, this.props)}
      onTouchTap={this.handleNext} />
    const previousButton = <FlatButton label='Retour' disabled={stepIndex === 0} onTouchTap={this.handlePrev} style={{
      marginRight: 12
    }} />

    return (
      <div style={{
        margin: '12px 0'
      }}>
        {isVertical
          ? nextButton
          : previousButton}
        {isVertical && step > 0
          ? previousButton
          : !isVertical
            ? nextButton
            : null}
      </div>
    )
  }

  getStepContent = (stepIndex) => {
    const {
      name,
      year,
      wineType,
      wineCategory,
      bottleType,
      wineFamily,
      isInBoxes,
      positionComment,
      source,
      count
    } = this.state
    let cases = []
    cases.push(<FieldsStep
      name={name}
      year={year}
      source={source}
      onSourceChange={this.handleSource}
      onNameChange={this.handleNameChange}
      onYearChange={this.handleYearChange}
      onWineFamilyChange={this.handleWineFamilyChange}
      defaultWineFamily={wineFamily} />)
    cases.push(<TypesStep handleWineType={this.handleWineType} handleWineCategory={this.handleWineCategory} handleBottleType={this.handleBottleType} wineType={wineType} wineCategory={wineCategory} bottleType={bottleType} />)
    cases.push(<PictureStep {...this.props} />)
    cases.push(<PositionStep
      positionComment={positionComment}
      handlePositionComment={this.handlePositionComment}
      count={count}
      handleCount={this.handleCount}
      isInBoxes={isInBoxes}
      onPositionOrigin={this.onPositionOrigin}
      {...this.props} />)

    return cases[stepIndex]
  }

  render () {
    const {stepIndex, orientation} = this.state
    const isVertical = orientation === 'vertical'
    const stepContent = this.getStepContent(stepIndex)

    const actions = [
      <FlatButton
        label='Annuler'
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label='Ajouter'
        primary
        onTouchTap={this.handleAddWine}
      />
    ]

    return (
      <div style={{
        width: '100%',
        maxWidth: 700,
        margin: 'auto'
      }}>
        <Stepper activeStep={stepIndex} orientation={orientation}>
          {STEPS.map((step, index) => <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            {isVertical
              ? <StepContent className='fix-me'>
                  {stepContent}
                  {this.renderStepActions(stepIndex)}
              </StepContent>
              : <span style={{
                display: 'none'
              }} />
            }
          </Step>)}
        </Stepper>
        {!isVertical && <div style={{
          margin: '0 16px'
        }}>
          {stepContent}
          {this.renderStepActions(stepIndex)}
        </div>
        }
        {this.state.open && (
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            Voulez-vous vraiment ajouter la bouteille ?
          </Dialog>
        )}
      </div>
    )
  }
}

export default connect(state => ({
  ...state.cellar,
  upload: state.upload
}))(Add)
