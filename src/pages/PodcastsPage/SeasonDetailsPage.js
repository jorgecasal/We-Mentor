import React from "react";
import {
  Pane,
  Button,
  TextInputField,
  TextareaField,
  FilePicker,
  Menu,
  Spinner,
  Checkbox
} from "evergreen-ui";

import { Progressbar } from "../../ui/Progressbar";
import { BottomButtonWrapper } from "../../ui/BottomButtonWrapper";

import { ContextMenu } from "../../components/ContextMenu";
import { useParams, useHistory } from "react-router";
import { EpisodeList } from "./EpisodeList";
import { useSeasonDetails } from "../../hooks/useSeasonDetails";

export function SeasonDetailsPage({ match }) {
  const history = useHistory();
  const { seasonId } = useParams();

  const {
    loading,
    title,
    setTitle,
    description,
    setDescription,
    saving,
    saveSeason,
    deleteSeason,
    promoted,
    setPromoted,
    uploadImage,
    podcastImageUrl,
    imageUploadProgress,
    imageUploading,
    setPodcastImageUrl
  } = useSeasonDetails(seasonId);

  const getFile = files => files[0];

  const onImageChange = async event => {
    uploadImage(getFile(event));
  };

  return (
    <>
      <EpisodeList />

      {loading ? (
        <Spinner />
      ) : (
        <Pane width={600}>
          <ContextMenu
            title="Allmänt"
            menu={
              <Menu>
                <Menu.Group>
                  <Menu.Item
                    icon="trash"
                    intent="danger"
                    onSelect={async () => {
                      try {
                        history.push("/podcasts");
                        await deleteSeason();
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Ta bort säsong
                  </Menu.Item>
                </Menu.Group>
              </Menu>
            }
          />

          <Pane padding={20}>
            <TextInputField
              editable="true"
              label="Namn på podd"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />

            <TextareaField
              label="Beskrivning"
              id="textarea-season-details"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />

            <Checkbox
              label="Promoted"
              checked={promoted}
              onChange={event => setPromoted(event.target.checked)}
            />
          </Pane>

          <Pane display="flex" padding={20}>
            <Pane flex={1}>
              <img
                alt="Omslagsbild"
                src={podcastImageUrl}
                width="150"
                height="150"
              />
            </Pane>

            <Pane paddingLeft={20}>
              <TextInputField
                editable="true"
                label="URL för omslagsbild"
                value={podcastImageUrl}
                onChange={event => setPodcastImageUrl(event.target.value)}
              />
              <FilePicker
                placeholder="Ladda upp ny omslagsbild"
                onChange={onImageChange}
              />
              {imageUploading && <Progressbar progress={imageUploadProgress} />}
            </Pane>
          </Pane>

          <BottomButtonWrapper>
            <Button marginRight={10} onClick={() => history.goBack()}>
              Avbryt
            </Button>
            <Button
              marginRight={16}
              appearance="primary"
              intent="success"
              onClick={async () => {
                try {
                  await saveSeason();
                } catch (error) {
                  console.log(error);
                }
              }}
              disabled={saving}
            >
              {saving ? "Sparar..." : "Spara"}
            </Button>
          </BottomButtonWrapper>
        </Pane>
      )}
    </>
  );
}
