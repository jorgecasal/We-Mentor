import React, { useState } from "react";
import { Pane, Button, TextInputField } from "evergreen-ui";

import { useHistory } from "react-router";
import ContentService from "../../services/ContentService";
import { ContextMenu } from "../../components/ContextMenu";
import { BottomButtonWrapper } from "../../ui/BottomButtonWrapper";

const useAddContent = () => {
  const history = useHistory();
  const [name, setName] = useState("");

  const addContent = async () => {
    try {
      let contentId = await ContentService.addNewContent(name);
      history.push(`/content/${contentId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    name,
    setName,
    addContent
  };
};

export function AddContentPage() {
  const history = useHistory();
  const { name, setName, addContent } = useAddContent();

  return (
    <Pane width={600}>
      <ContextMenu title="Lägg till ny infosida" />
      <Pane padding={20}>
        <TextInputField
          label="Namn för innehåll"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </Pane>

      <BottomButtonWrapper>
        <Button marginRight={10} onClick={() => history.goBack()}>
          Avbryt
        </Button>
        <Button appearance="primary" intent="success" onClick={addContent}>
          Lägg till
        </Button>
      </BottomButtonWrapper>
    </Pane>
  );
}
