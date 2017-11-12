// @flow
import React from "react";
import throttle from "lodash.throttle";

const DEFAULT_THROTTLE_WAIT = 500;

type ImageProps = {
  src: string,
  width: number,
  height: number,
  lazyLoader: string,
  delay: number
};

export default class Image extends React.Component<ImageProps> {
  static scrollFunction;

  state = {
    url: this.props.lazyLoader
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ url: nextProps.src });
  }

  componentDidMount() {
    this.scrollFunction = this.trottleScroll.bind(this);
    this.handleScroll();
    window.addEventListener("scroll", this.scrollFunction);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollFunction);
  }

  trottleScroll = throttle(
    this.handleScroll,
    this.props.delay || DEFAULT_THROTTLE_WAIT
  );

  handleScroll() {
    const rect = this.imgNode.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top >= -200 && rect.top <= windowHeight) {
      this.setState({ url: this.props.src });
      window.removeEventListener("scroll", this.scrollFunction);
    }
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
