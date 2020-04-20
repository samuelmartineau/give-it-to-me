import React, { FC } from 'react';
import styled from 'styled-components';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const Input = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;

  &:focus + label {
    outline: -webkit-focus-ring-color auto 5px;
  }

  &:checked + label > svg {
    color: ${(props) => props.theme.colors.primary};
  }
`;
const Label = styled.label`
  vertical-align: bottom;
  display: inline-flex;
`;

type Props = {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  checked: boolean;
  id: string;
  className: string;
};

export const Radio: FC<Props> = ({
  children,
  value,
  onChange,
  name,
  id,
  checked,
  className,
}) => (
  <>
    <Input
      id={id}
      type="radio"
      value={value}
      checked={checked}
      name={name}
      onChange={onChange}
    />
    <Label htmlFor={id} className={className}>
      {checked ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}

      {children}
    </Label>
  </>
);
