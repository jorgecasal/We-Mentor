import React from "react";
import { Pane, Tab } from "evergreen-ui";

const CONTEXT_CHILD = "parent";
const CONTEXT_MOTHER = "development";
const COTNEXT_PARTNER = "tips";

export const ContextSelector = ({ selectedContext, setSelectedContext }) => {
  return (
    <Pane paddingBottom={20}>
      <Tab
        isSelected={selectedContext === CONTEXT_CHILD}
        onSelect={() => setSelectedContext(CONTEXT_CHILD)}
      >
        Föräldrarskap
      </Tab>
      <Tab
        isSelected={selectedContext === CONTEXT_MOTHER}
        onSelect={() => setSelectedContext(CONTEXT_MOTHER)}
      >
        Utveckling
      </Tab>
      <Tab
        isSelected={selectedContext === COTNEXT_PARTNER}
        onSelect={() => setSelectedContext(COTNEXT_PARTNER)}
      >
        Tips och tricks
      </Tab>
    </Pane>
  );
};
