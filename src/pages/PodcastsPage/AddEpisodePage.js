import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { Pane, TextInputField, TextareaField, Button } from "evergreen-ui";

import PodcastService from "../../services/PodcastService";
import { useSelectedLanguage } from "../../context/language";

import { EpisodeList } from "./EpisodeList";
import { ContextMenu } from "../../components/ContextMenu";
import { BottomButtonWrapper } from "../../ui/BottomButtonWrapper";

const useAddEpisode = seasonId => {
  const history = useHistory();
  const { selectedLanguage } = useSelectedLanguage();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createEpisode = async () => {
    try {
      await PodcastService.createEpisode(
        selectedLanguage,
        seasonId,
        name,
        description
      ).then(({ id }) => {
        console.log("Episode added");
        history.push(`/podcasts/${seasonId}/${id}`);
      });
    } catch (err) {
      console.log("Error adding new episode", err);
    }
  };

  return {
    name,
    setName,
    description,
    setDescription,
    createEpisode
  };
};

export function AddEpisodePage() {
  const history = useHistory();
  const { seasonId } = useParams();
  const {
    name,
    setName,
    description,
    setDescription,
    createEpisode
  } = useAddEpisode(seasonId);

  return (
    <>
      <EpisodeList />

      <Pane width={600}>
        <ContextMenu title="Lägg till avsnitt" />

        <Pane padding={20}>
          <TextInputField
            label="Namn"
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
            <Button
              intent="success"
              appearance="primary"
              onClick={createEpisode}
            >
              Lägg till
            </Button>
          </BottomButtonWrapper>
        </Pane>
      </Pane>
    </>
  );
}
