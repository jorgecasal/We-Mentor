import React from "react";
import { Menu, Pane, Heading } from "evergreen-ui";
import styled from "styled-components";

import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";

import theme from "../../theme";
import { usePodcastEpisodeList } from "../../hooks/usePodcastEpisodeList";
import { useParams } from "react-router";

const StyledDragHandle = styled.span`
  position: absolute;
  left: 10px;
`;

const DragHandle = sortableHandle(() => (
  <StyledDragHandle>::</StyledDragHandle>
));

export function EpisodeList() {
  const { seasonId } = useParams();
  console.log(seasonId)
  const {
    episodes,
    selectEpisode,
    addEpisode,
    updateSortOrder
  } = usePodcastEpisodeList(seasonId);

  return (
    <Pane
      width={250}
      height="100vh"
      padding={20}
      backgroundColor={theme.colors.grey3}
    >
      <Heading>Allmänt</Heading>

      <hr />

      <Pane paddingTop={20}>
        <SortableList
          useDragHandle
          onSortEnd={updateSortOrder}
          episodes={episodes}
          onSelectEpisode={selectEpisode}
          addEpisode={addEpisode}
          seasonId={seasonId}
        />
      </Pane>
    </Pane>
  );
}

const SortableList = sortableContainer(
  ({ episodes, seasonId, onSelectEpisode, addEpisode }) => {
    return (
      <Menu>
        {episodes.map((episode, index) => (
          <EpisodeItem
            key={`episode-${episode.id}`}
            index={index}
            episode={episode}
            onSelectEpisode={onSelectEpisode}
          />
        ))}
        <Menu.Divider />
        <Menu.Item icon="add" onSelect={() => addEpisode(seasonId)}>
          Lägg till nytt poddavsnitt
        </Menu.Item>
      </Menu>
    );
  }
);

const EpisodeItem = sortableElement(({ episode, onSelectEpisode }) => (
  <Menu.Item
    key={episode.id}
    height="auto"
    padding={10}
    position="relative"
    onSelect={() => onSelectEpisode(episode)}
  >
    <DragHandle />
    {episode.name}
  </Menu.Item>
));
