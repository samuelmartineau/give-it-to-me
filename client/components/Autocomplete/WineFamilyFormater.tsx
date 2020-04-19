import React from 'react';
import { connect } from 'react-redux';
import { utils } from '~/config';

type Props = {
  wineFamilies: Array<{}>;
  children: React.Node;
};

class WineFamilyFormater extends React.Component<Props> {
  render() {
    const { wineFamilies } = this.props;

    const areasFormated = wineFamilies.map((wineFamily) => ({
      id: wineFamily.id,
      label: wineFamily.name,
      searchKey: utils.cleanString(wineFamily.name),
    }));

    return this.props.children(areasFormated);
  }
}

export default connect((state) => ({
  wineFamilies: state.wineFamilies.all,
}))(WineFamilyFormater);
