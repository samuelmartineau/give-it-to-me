import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import config from '~/config';
import { RootState } from '@/store';

type Props = {
  children: (
    data: { id: number; label: string; searchKey: string }[]
  ) => React.ReactNode;
} & PropsFromRedux;

const WineFamilyFormater: FC<Props> = ({ wineFamilies, children }) => {
  const areasFormated = wineFamilies.map((wineFamily) => ({
    id: wineFamily.id,
    label: wineFamily.name,
    searchKey: config.utils.cleanString(wineFamily.name),
  }));

  return <>{children(areasFormated)}</>;
};

const connector = connect((state: RootState) => ({
  wineFamilies: state.wineFamilies.all,
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(WineFamilyFormater);
