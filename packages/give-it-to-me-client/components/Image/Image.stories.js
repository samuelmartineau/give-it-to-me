import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Image from "./Image";

storiesOf("Image", module).add("Default", () => (
  <Image
    src="https://upload.wikimedia.org/wikipedia/en/9/99/MarioSMBW.png"
    width={191}
    height={296}
    lazyLoader="data:image/gif;base64,R0lGODlhAgADAPIAALlkW6RWTmxjjGJZfTJhoTJclwAAAAAAACH5BAAAAAAAIf8LSW1hZ2VNYWdpY2sNZ2FtbWE9MC40NTQ1NQAsAAAAAAIAAwAAAwQIIUOVADs="
    delay={1000}
  />
));
