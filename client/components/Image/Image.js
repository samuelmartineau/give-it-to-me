// @flow
import React from 'react';

type Props = {
  src: string,
  width: number,
  height: number,
  lazyLoader: string,
  delay: number,
  className?: String
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
