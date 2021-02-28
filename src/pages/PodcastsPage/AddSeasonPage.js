import React, { useState } from "react";
import { Pane, Button, TextareaField, TextInputField } from "evergreen-ui";

import PodcastService from "../../services/PodcastService";

import { useSelectedLanguage } from "../../context/language";
import { useHistory } from "react-router";
import { ContextMenu } from "../../components/ContextMenu";
import { BottomButtonWrapper } from "../../ui/BottomButtonWrapper";

const useAddSeason = () => {
  const history = useHistory();
  const { selectedLanguage } = useSelectedLanguage();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const addSeason = () => {
    PodcastService.createSeason(selectedLanguage, name, description)
      .then(({ id }) => {
        console.log("Season added");
        history.push(`/podcasts/${id}`);
      })
      .catch(err => {
        console.log("Error adding new season", err);
      });
  };

  return {
    name,
    setName,
    description,
    setDescription,
    addSeason
  };
};

export function AddSeasonPage() {
  const history = useHistory();
  const {
    name,
    setName,
    description,
    setDescription,
    addSeason
  } = useAddSeason();

  return (
    <Pane width={600}>
      <ContextMenu title="Lägg till ny podd" />
      <Pane padding={20}>
        <TextInputField
          label="Namn på podd"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <TextareaField
          label="Beskrivning"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />

        <BottomButtonWrapper>
          <Button marginRight={10} onClick={() => history.goBack()}>
            Avbryt
          </Button>
          <Button intent="success" appearance="primary" onClick={addSeason}>
            Lägg till
          </Button>
        </BottomButtonWrapper>
      </Pane>
    </Pane>
  );
}
