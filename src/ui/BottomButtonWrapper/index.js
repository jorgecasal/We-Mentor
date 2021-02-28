import React from "react";
import { Pane } from "evergreen-ui";

export const BottomButtonWrapper = ({ children }) => (
  <Pane
    // position="absolute"
    // bottom={0}
    padding={20}
    borderTop="1px solid #e0e0e0"
    backgroundColor="white"
    width="100%"
    zIndex={100}
  >
    {children}
  </Pane>
);
