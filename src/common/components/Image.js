import React, {PropTypes, Component} from 'react'
import {throttle} from 'lodash'
import ReactDOM from 'react-dom'

const DEFAULT_THROTTLE_WAIT = 500

export default class Image extends Component {
  static scrollFunction;

  constructor (props) {
    super(props)

    this.state = {
      url: props.lazyLoader
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({url: nextProps.src})
  }

  componentDidMount () {
    this.scrollFunction = this.trottleScroll.bind(this)
    this.handleScroll()
    window.addEventListener('scroll', this.scrollFunction)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollFunction)
  }

  trottleScroll = throttle(this.handleScroll, DEFAULT_THROTTLE_WAIT)

  handleScroll () {
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
    const windowHeight = window.innerHeight
    if (rect.top >= -200 && rect.top <= windowHeight) {
      this.setState({url: this.props.src})
      window.removeEventListener('scroll', this.scrollFunction)
    }
  }

  render () {
    const {width, height, style} = this.props
    return (<img style={style} width={width} height={height} src={this.state.url} />)
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  lazyLoader: PropTypes.string.isRequired
}
