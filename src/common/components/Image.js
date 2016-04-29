import React, {PropTypes, Component} from 'react';
import Dropzone from 'react-dropzone';
import {throttle} from 'lodash';
import ReactDOM from 'react-dom';

const DEFAULT_THROTTLE_WAIT = 500;

export default class Image extends Component {

    static scrollFunction;

    constructor(props) {
      super(props);

      this.state = {
        url: props.lazyLoader
      };
    }

    componentDidMount() {
        this.scrollFunction = this.trottleScroll.bind(this);
        window.addEventListener('scroll', this.scrollFunction);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollFunction);
    }

    trottleScroll = throttle(this.handleScroll, DEFAULT_THROTTLE_WAIT);

    handleScroll(event) {
        const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if(rect.top <= windowHeight) {
            window.removeEventListener('scroll', this.scrollFunction);
            this.setState({
              url: this.props.src
            });
        }
    }

    render() {
        const { width, height } = this.props;
        return (
          <img
            width={width}
            height={height}
            src={this.state.url}
          />
        );
    }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  lazyLoader: PropTypes.string.isRequired
}