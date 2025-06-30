import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { utils } from '~/config';
import { RootState } from '~/client/store';

type Props = {
  children: (
    data: { id: number; label: string; searchKey: string }[]
  ) => React.ReactNode;
} & PropsFromRedux;

const WineFamilyFormater: FC<Props> = ({ wineFamilies, children }) => {
  const areasFormated = wineFamilies.map((wineFamily) => ({
    id: wineFamily.id,
    label: wineFamily.name,
    searchKey: utils.cleanString(wineFamily.name),
  }));

  return <>{children(areasFormated)}</>;
};

const connector = connect((state: RootState) => ({
  wineFamilies: state.wineFamilies.all,
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(WineFamilyFormater);
