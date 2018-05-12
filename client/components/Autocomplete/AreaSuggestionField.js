import React from 'react';
import { AreaSuggestion } from './AreaSuggestion';
import { Field } from 'react-form';

const validate = value => ({
  error: !value
});

export const AreaSuggestionField = (
  props // Use the form field and your custom input together to create your very own input!
) => (
  <Field validate={validate} field={props.field}>
    {fieldApi => {
      // Remember to pull off everything you dont want ending up on the <input>
      // thats why we pull off onChange, onBlur, and field
      // Note, the ...rest is important because it allows you to pass any
      // additional fields to the internal <input>.
      const { onChange, onBlur, field, ...rest } = props;

      const { value, error, warning, success, setValue, setTouched } = fieldApi;

      return (
        <div>
          <AreaSuggestion
            {...rest}
            value={value || ''}
            onSuggestionSelected={(evt, areaSuggestion) => {
              setValue(areaSuggestion.suggestion.original.id);
              if (onChange) {
                onChange(areaSuggestion.suggestion.original.id, evt);
              }
            }}
            onBlur={e => {
              setTouched();
              if (onBlur) {
                onBlur(e);
              }
            }}
          />
          {/* {error ? <Message color="red" message={error} /> : null}
          {!error && warning ? (
            <Message color="orange" message={warning} />
          ) : null}
          {!error && !warning && success ? (
            <Message color="green" message={success} />
          ) : null} */}
        </div>
      );
    }}
  </Field>
);
