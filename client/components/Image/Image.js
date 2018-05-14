// @flow
import React from 'react';
import throttle from 'lodash/throttle';

const THROTTLE_WAIT = 100;
const DEFAULT_DELAY = 300;

type Props = {
  src: string,
  width: number,
  height: number,
  lazyLoader: string,
  delay: number,
  className: String
};

export class Image extends React.Component<Props> {
  static scrollFunction;
  scrollFunction: Function;

  constructor(props: Props) {
    super(props);
    this.scrollFunction = this.trottleScroll.bind(this);
    this.state = { url: props.lazyLoader };
    this.delay = props.delay || DEFAULT_DELAY;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ url: nextProps.src });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollFunction);
    window.addEventListener('resize', this.scrollFunction);
    this.trottleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFunction);
    window.removeEventListener('resize', this.scrollFunction);
    this.trottleScroll.cancel();
    clearTimeout(this.timeout);
  }

  trottleScroll = throttle(this.handleScroll, THROTTLE_WAIT);

  handleScroll() {
    const rect = this.imgNode.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (!this.timeout && rect.bottom >= 0 && rect.top <= windowHeight) {
      this.timeout = setTimeout(() => {
        this.setState({ url: this.props.src });
        window.removeEventListener('scroll', this.scrollFunction);
        window.removeEventListener('resize', this.scrollFunction);
      }, this.delay);
    } else if (this.timeout && (rect.bottom < 0 || rect.top > windowHeight)) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  render() {
    const { width, height, className } = this.props;
    return (
      <img
        className={className}
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
