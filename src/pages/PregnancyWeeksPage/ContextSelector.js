import React from "react";
import { Pane, Tab } from "evergreen-ui";

const CONTEXT_CHILD = "child";
const CONTEXT_MOTHER = "mother";
const COTNEXT_PARTNER = "partner";

export const ContextSelector = ({ selectedContext, setSelectedContext }) => {
  return (
    <Pane paddingBottom={20}>
      <Tab
        isSelected={selectedContext === CONTEXT_CHILD}
        onSelect={() => setSelectedContext(CONTEXT_CHILD)}
      >
        Bebis
      </Tab>
      <Tab
        isSelected={selectedContext === CONTEXT_MOTHER}
        onSelect={() => setSelectedContext(CONTEXT_MOTHER)}
      >
        Mamma
      </Tab>
      <Tab
        isSelected={selectedContext === COTNEXT_PARTNER}
        onSelect={() => setSelectedContext(COTNEXT_PARTNER)}
      >
        Partner
      </Tab>
    </Pane>
  );
};
