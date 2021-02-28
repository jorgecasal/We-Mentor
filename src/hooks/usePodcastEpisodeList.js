import { useEffect } from "react";
import PodcastService from "../services/PodcastService";
import { useSelectedLanguage } from "../context/language";
import { useHistory } from "react-router";
import arrayMove from "array-move";
import { usePodcastContext } from "../context/usePodcast";

export const usePodcastEpisodeList = seasonId => {
  const history = useHistory();
  const { episodes, setEpisodes } = usePodcastContext();
  const { selectedLanguage } = useSelectedLanguage();

  useEffect(() => {
    // returns an unsubscribe function for cleanup
    if (selectedLanguage && seasonId) {
      return PodcastService.subscribeToSeasonEpisodes(
        selectedLanguage,
        seasonId,
        (err, episodes) => {
          if (err) {
            console.log(err);
          } else {
            setEpisodes(episodes);
          }
        }
      );
    }
  }, [selectedLanguage, seasonId, setEpisodes]);

  const selectEpisode = episode => {
    history.push(`/podcasts/${seasonId}/${episode.id}`);
  };

  const addEpisode = seasonId => {
    history.push(`/podcasts/add/${seasonId}`);
  };

  const updateSortOrder = async ({ oldIndex, newIndex, collection }) => {
    const episodesUpdated = arrayMove(episodes, oldIndex, newIndex);
    setEpisodes(episodesUpdated);

    try {
      await Promise.all(
        episodesUpdated.map((episode, idx) =>
          PodcastService.updateEpisodeDetails(
            selectedLanguage,
            seasonId,
            episode.id,
            {
              sortOrder: idx
            }
          )
        )
      );
      console.log("Updated sort order");
    } catch (err) {
      console.log("Error updating sort order", err);
    }
  };

  return { episodes, selectEpisode, addEpisode, updateSortOrder };
};
