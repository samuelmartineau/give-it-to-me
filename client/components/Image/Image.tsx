import React, { FC } from 'react';

type Props = {
  src: string;
  width: number;
  height: number;
  lazyLoader: string;
  delay: number;
  className?: string;
};

export const Image: FC<Props> = ({ width, height, className, lazyLoader }) => {
  return (
    <img
      style={{ background: `url(${lazyLoader})` }}
      className={className}
      width={width}
      height={height}
      src={this.props.src}
    />
  );
};
