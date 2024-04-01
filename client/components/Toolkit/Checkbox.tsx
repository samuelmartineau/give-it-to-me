import React, { FC } from 'react';
import styled from 'styled-components';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

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

export type CheckboxProps = {
  children: React.ReactNode;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  checked: boolean;
  id: string;
  className?: string;
};

export const Checkbox: FC<CheckboxProps> = ({
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
      type="checkbox"
      value={value}
      checked={checked}
      name={name}
      onChange={onChange}
    />
    <Label htmlFor={id} className={className}>
      {checked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}

      {children}
    </Label>
  </>
);
