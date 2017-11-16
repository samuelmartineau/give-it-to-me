import React from "react";
import { storiesOf } from "@storybook/react";
import CellarSchema from "./CellarSchema";

storiesOf("CellarSchema", module)
  .add("Presentation", () => <CellarSchema />)
  .add("Selection", () => (
    <CellarSchema
      onSelect={console.log}
      selectableBoxes={[0, 1, 2, 3, 23, 24, 25]}
    />
  ));
