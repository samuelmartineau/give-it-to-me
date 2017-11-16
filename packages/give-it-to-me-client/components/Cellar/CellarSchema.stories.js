import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import CellarSchema from "./CellarSchema";

storiesOf("CellarSchema", module)
  .add("Presentation", () => <CellarSchema />)
  .add("Selection", () => (
    <CellarSchema
      onSelect={action("on-select")}
      selectableBoxes={[0, 1, 2, 3, 23, 24, 25]}
    />
  ));
