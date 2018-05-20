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
  render() {
    const { width, height, className, lazyLoader } = this.props;
    return (
      <img
        style={{ background: `url(${lazyLoader})` }}
        className={className}
        width={width}
        height={height}
        src={this.props.src}
      />
    );
  }
}
