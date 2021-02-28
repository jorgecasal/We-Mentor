import React from "react";
import { useParams } from "react-router";
import { Pane, Menu, TextInputField } from "evergreen-ui";

import { ContextMenu } from "../../components/ContextMenu";
import { ContentEditor } from "../../components/ContentEditor";
import { useContentDetails } from "../../hooks/useContentDetails";

export const ContentDetails = () => {
  const { contentId } = useParams();
  const {
    documentRef,
    editorContent,
    setEditorContent,
    contentName,
    setContentName,
    deleteContent
  } = useContentDetails(contentId);

  return (
    <Pane height="100vh" width={600} overflowY="auto" backgroundColor="white">
      <ContextMenu
        title={contentName}
        menu={
          <Menu>
            <Menu.Group>
              <Menu.Item icon="trash" intent="danger" onSelect={deleteContent}>
                Ta bort
              </Menu.Item>
            </Menu.Group>
          </Menu>
        }
      />

      <Pane padding={20}>
        <TextInputField
          label="Namn"
          value={contentName}
          onChange={e => setContentName(e.target.value)}
        />

        <ContentEditor
          documentRef={documentRef}
          content={editorContent}
          setEditorContent={setEditorContent}
          contentName={contentName}
        />
      </Pane>
    </Pane>
  );
};
