import React, { FC } from 'react';

type Props = {
  src: string;
  width: number;
  height: number;
  lazyLoader: string;
  className?: string;
};

export const Image: FC<Props> = ({
  src,
  width,
  height,
  className,
  lazyLoader,
}) => {
  return (
    <img
      style={{ background: `url(${lazyLoader})` }}
      className={className}
      width={width}
      height={height}
      src={src}
    />
  );
};
