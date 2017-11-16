import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import WineCard from "./WineCard";

storiesOf("WineCard", module).add("default", () => (
  <WineCard
    wine={{
      wineType: "RED",
      name: "Wine test",
      thumbnailFileName:
        "https://upload.wikimedia.org/wikipedia/en/9/99/MarioSMBW.png",
      blur:
        "data:image/gif;base64,R0lGODlhAgADAPIAALlkW6RWTmxjjGJZfTJhoTJclwAAAAAAACH5BAAAAAAAIf8LSW1hZ2VNYWdpY2sNZ2FtbWE9MC40NTQ1NQAsAAAAAAIAAwAAAwQIIUOVADs="
    }}
  />
));
