// @flow
import React from 'react';
import styled from 'styled-components';

type Props = {|
  children: React.Node,
  onChange: Function,
  name: string,
  value: string,
  checked: boolean,
  id: string,
  className: string
|};

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

  &:checked + label > i {
    color: ${props => props.theme.colors.primary};
  }
`;
const Label = styled.label`
  vertical-align: bottom;
  display: inline-flex;
`;

export const Checkbox = ({
  children,
  value,
  onChange,
  name,
  id,
  checked,
  className
}: Props) => (
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
      <i className="material-icons">
        {checked ? 'check_box' : 'check_box_outline_blank'}
      </i>

      {children}
    </Label>
  </>
);
