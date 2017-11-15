import React from "react";
import { storiesOf } from "@storybook/react";
import CellarSchemaSelection from "./CellarSchemaSelection";

storiesOf("CellarSchemaSelection", module).add("default", () => (
  <CellarSchemaSelection onBoxSelect={console.log} />
));
