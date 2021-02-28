import React from "react";
import {
  Pane,
  Menu,
  Button,
  TextInputField,
  TextareaField,
  FilePicker,
  Alert
} from "evergreen-ui";

import { Audio } from "../../ui/Audio";
import { Progressbar } from "../../ui/Progressbar";
import { ContextMenu } from "../../components/ContextMenu";
import { useParams, useHistory } from "react-router";
import { EpisodeList } from "./EpisodeList";
import { useEpisodeDetails } from "../../hooks/useEpisodeDetails";
import { BottomButtonWrapper } from "../../ui/BottomButtonWrapper";

export function EpisodeDetailsPage() {
  const history = useHistory();
  const { seasonId, episodeId } = useParams();

  const {
    audioRef,
    audioError,
    setAudioError,
    name,
    setName,
    description,
    setDescription,
    podcastUrl,
    setPodcastUrl,
    podcastUploadProgress,
    saving,
    duration,
    setDuration,
    uploadPodcast,
    audioUploading,
    saveEpisode,
    deleteEpisode
  } = useEpisodeDetails(seasonId, episodeId);

  const getFile = files => files[0];

  const onPodcastChange = async event => {
    uploadPodcast(getFile(event));
  };

  const onDurationChange = async event => {
    try {
      setDuration(parseFloat(event.target.value));
    } catch (err) {
      setDuration(0);
    }
  };

  return (
    <>
      <EpisodeList />

      <Pane height="100vh" overflowY="auto" width={600}>
        <ContextMenu
          title="Allmänt"
          menu={
            <Menu>
              <Menu.Group>
                <Menu.Item
                  icon="trash"
                  intent="danger"
                  onSelect={deleteEpisode}
                >
                  Ta bort avsnitt
                </Menu.Item>
              </Menu.Group>
            </Menu>
          }
        />

        <Pane padding={20}>
          {audioError ? (
            <Alert
              marginBottom={20}
              intent="danger"
              title="Kan inte ladda ljudkälla. Kontrollera att URL för ljudkällan är korrekt, samt att den är tillgänglig publikt."
            />
          ) : (
            <Audio
              ref={audioRef}
              onChange={onDurationChange}
              onError={e => setAudioError(true)}
              controls
            >
              <source src={podcastUrl} type="audio/mpeg" />
              <Alert
                intent="warning"
                title="Your browser does not support the audio element."
              />
            </Audio>
          )}

          <Pane>
            <TextInputField
              label="Namn"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextareaField
              label="Beskrivning"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <TextInputField
              editable="true"
              label="Längd (sekunder)"
              value={duration}
              onChange={onDurationChange}
            />
          </Pane>

          <Pane>
            <TextInputField
              editable="true"
              label="URL för ljudkälla"
              value={podcastUrl}
              onChange={event => setPodcastUrl(event.target.value)}
            />
            <FilePicker
              placeholder="Ladda upp ny ljudkälla"
              onChange={onPodcastChange}
            />
            {audioUploading && <Progressbar progress={podcastUploadProgress} />}
          </Pane>

          <BottomButtonWrapper>
            <Button marginRight={10} onClick={() => history.goBack()}>
              Avbryt
            </Button>
            <Button
              intent="success"
              appearance="primary"
              onClick={saveEpisode}
              disabled={saving}
            >
              {saving ? "Sparar.." : "Spara"}
            </Button>
          </BottomButtonWrapper>
        </Pane>
      </Pane>
    </>
  );
}
