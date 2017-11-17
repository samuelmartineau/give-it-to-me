import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MetaStep from "./MetaStep";
import PictureStep from "./PictureStep";
import TypesStep from "./TypesStep";
import PositionStep from "./PositionStep";

storiesOf("Steps", module)
  .add("Meta", () => <MetaStep />)
  .add("Picture", () => <PictureStep />)
  .add("Types", () => <TypesStep />)
  .add("Position", () => (
    <PositionStep
      bottles={[
        {
          box: 13,
          cell: 0
        },
        {
          box: 13,
          cell: 1
        },
        {
          box: 13,
          cell: 2
        },
        {
          box: 13,
          cell: 3
        },
        {
          box: 13,
          cell: 4
        },
        {
          box: 13,
          cell: 5
        },
        {
          box: 23,
          cell: 6
        },
        {
          box: 23,
          cell: 7
        },
        {
          box: 23,
          cell: 8
        }
      ]}
    />
  ));
