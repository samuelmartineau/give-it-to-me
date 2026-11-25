import React, { FC } from 'react';
import styled from 'styled-components';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const Input = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;

  &:focus-visible + label {
    outline: 3px solid ${(props) => props.theme.colors.focus};
    outline-offset: 2px;
  }

  &:checked + label {
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.primaryVarient};
    font-weight: 700;
  }

  &:checked + label > svg {
    color: ${(props) => props.theme.colors.primary};
  }
`;
const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  padding: 6px 16px 6px 10px;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 999px;
  background: ${(props) => props.theme.colors.surface};
  font-size: 1.05rem;
  cursor: pointer;
  user-select: none;

  & > svg {
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.textMuted};
  }
`;

type Props = {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  checked: boolean;
  id: string;
  className?: string;
};

export const Radio: FC<React.PropsWithChildren<Props>> = ({
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
