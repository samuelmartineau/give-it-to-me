import React from 'react'

import CellarSchema from '../CellarSchema'
import CellsSelectors from '../CellsSelectors'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'

const PositionStep = (props) => {
  const {onPositionOrigin, isInBoxes, positionComment, handlePositionComment} = props
  return (
    <div>
      <Toggle
        label='Les bouteilles sont-elles dans les caisses?'
        defaultToggled={isInBoxes}
        onToggle={onPositionOrigin}
      />
      {isInBoxes && <CellarSchema {...props} />}
      {isInBoxes && <CellsSelectors {...props} />}
      {isInBoxes || <TextField
        value={positionComment}
        floatingLabelText='Commentaire sur la position'
        onChange={handlePositionComment} />}
    </div>
  )
}

export default PositionStep
