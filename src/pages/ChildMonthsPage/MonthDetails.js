import React from "react";
import { Pane, Tab } from "evergreen-ui";
import { useParams } from "react-router";
import { Editor } from "../../components/Editor/";
import { useChildMonth } from "../../hooks/useChildMonths";
import { ContextMenu } from "../../components/ContextMenu";

export const MonthDetails = () => {
  const { monthId } = useParams();
  let {
    documentRef,
    selectedContext,
    setSelectedContext,
    selectedMonth,
  } = useChildMonth(monthId);

  return (
    <Pane>
      <ContextMenu title={selectedMonth?.title} />
      <Pane height="100vh" overflowY="auto">
        <Pane padding={20}>
          <ContextSelector
            selectedContext={selectedContext}
            setSelectedContext={setSelectedContext}
          />
        </Pane>
        <p>Text</p>
        {selectedMonth && (
          <Editor
            content={selectedMonth}
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
        isSelected={selectedContext === "parent"}
        onSelect={() => setSelectedContext("parent")}
      >
        Föräldrarskap
      </Tab>
      <Tab
        isSelected={selectedContext === "development"}
        onSelect={() => setSelectedContext("development")}
      >
        Utveckling
      </Tab>
      <Tab
        isSelected={selectedContext === "tips"}
        onSelect={() => setSelectedContext("tips")}
      >
        Tips och tricks
      </Tab>
    </Pane>
  );
};
