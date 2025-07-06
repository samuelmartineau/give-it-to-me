import React, { FC } from 'react';
import {
  OnSuggestionSelectedData,
  WineFamilySuggestion,
} from './WineFamilySuggestion';
import WineFamilyFormater from './WineFamilyFormater';

type Props = {
  selectedFamilyIds: Array<any>;
  onSuggestionSelected: (evt: any, data: OnSuggestionSelectedData) => void;
};

const WineFamilyMultipleSelector: FC<Props> = ({
  selectedFamilyIds,
  onSuggestionSelected,
}) => {
  return (
    <WineFamilyFormater>
      {(wineFamilies) => {
        const excluded = wineFamilies.filter(
          (item) => !selectedFamilyIds.includes(item.id),
        );
        return (
          <WineFamilySuggestion
            onSuggestionSelected={onSuggestionSelected}
            wineFamilies={excluded}
          />
        );
      }}
    </WineFamilyFormater>
  );
};
export default WineFamilyMultipleSelector;
