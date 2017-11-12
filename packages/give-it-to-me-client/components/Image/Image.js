// @flow
import React from "react";
import throttle from "lodash.throttle";

const THROTTLE_WAIT = 500;
const DEFAULT_DELAY = 500;

type ImageProps = {
  src: string,
  width: number,
  height: number,
  lazyLoader: string,
  delay: number
};

export default class Image extends React.Component<ImageProps> {
  static scrollFunction;

  constructor(props) {
    super(props);
    this.scrollFunction = this.trottleScroll.bind(this);
    this.state = {
      url: props.lazyLoader
    };
    this.delay = props.delay || DEFAULT_DELAY;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ url: nextProps.src });
  }

  componentDidMount() {
    window.addEventListener("scroll", this.scrollFunction);
    this.trottleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollFunction);
    this.trottleScroll.cancel();
    clearTimeout(this.timeout);
  }

  trottleScroll = throttle(this.handleScroll, THROTTLE_WAIT);

  handleScroll() {
    this.timeout = setTimeout(() => {
      const rect = this.imgNode.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top >= -200 && rect.top <= windowHeight) {
        this.setState({ url: this.props.src });
        window.removeEventListener("scroll", this.scrollFunction);
      }
    }, this.delay);
  }

  render() {
    const { width, height } = this.props;
    return (
      <img
        ref={node => {
          this.imgNode = node;
        }}
        width={width}
        height={height}
        src={this.state.url}
      />
    );
  }
}
