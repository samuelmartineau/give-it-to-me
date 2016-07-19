import React, {PropTypes} from 'react'

const color = '#ff9900'

const EmptyResult = ({title, message, icon}) => {
  const iconStylized = React.cloneElement(icon, {
    color: color,
    style: {
      width: '200px',
      height: '200px'
    }
  })
  return (
    <div style={{textAlign: 'center', flex: 1, color: color}}>
      <div>{iconStylized}</div>
      <h1 style={{fontSize: '30px'}}>{title}</h1>
      <p style={{fontSize: '20px', maxWidth: '400px', display: 'inline-block'}}>{message}</p>
    </div>
  )
}

EmptyResult.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default EmptyResult
