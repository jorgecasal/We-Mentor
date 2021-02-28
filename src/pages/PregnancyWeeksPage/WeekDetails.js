import React from "react";
import { Pane, Tab } from "evergreen-ui";
import { useParams } from "react-router";

import { Editor } from "../../components/Editor/";

import { usePregnancyWeek } from "../../hooks/usePregnancyWeeks";

import { ContextMenu } from "../../components/ContextMenu";

export const WeekDetails = () => {
  const { weekId } = useParams();

  const {
    documentRef,
    selectedContext,
    setSelectedContext,
    selectedWeek
  } = usePregnancyWeek(weekId);


  return (
    <Pane>
      <ContextMenu title={selectedWeek?.title} />

      <Pane height="100vh" overflowY="auto">
        <Pane padding={20}>
          <ContextSelector
            selectedContext={selectedContext}
            setSelectedContext={setSelectedContext}
          />
        </Pane>
        {selectedWeek && (
          <Editor
            content={selectedWeek}
            selectedContext={selectedContext}
            documentRef={documentRef}
          />
        )}
      </Pane>
    </Pane>
  );
};

const ContextSelector = ({ selectedContext, setSelectedContext }) => {
  return (
    <Pane paddingBottom={20}>
      <Tab
        isSelected={selectedContext === "child"}
        onSelect={() => setSelectedContext("child")}
      >
        Bebis
      </Tab>
      <Tab
        isSelected={selectedContext === "mother"}
        onSelect={() => setSelectedContext("mother")}
      >
        Mamma
      </Tab>
      <Tab
        isSelected={selectedContext === "partner"}
        onSelect={() => setSelectedContext("partner")}
      >
        Partner
      </Tab>
    </Pane>
  );
};
