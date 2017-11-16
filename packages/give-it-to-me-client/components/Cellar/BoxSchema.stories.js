import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import BoxSchema from "./BoxSchema";

storiesOf("BoxSchema", module)
  .add("Presentation", () => (
    <BoxSchema
      boxId={23}
      bottles={[
        {
          id: 1,
          box: 23,
          cell: 6
        },
        {
          id: 2,
          box: 23,
          cell: 7
        },
        {
          id: 3,
          box: 23,
          cell: 8
        }
      ]}
    />
  ))
  .add("Selection", () => (
    <BoxSchema
      boxId={23}
      bottles={[
        {
          id: 1,
          box: 23,
          cell: 6
        }
      ]}
      onSelect={action("on-select")}
      selectableCells={[0, 1, 2, 3]}
    />
  ));
