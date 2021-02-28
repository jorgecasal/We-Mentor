import { useEffect, useState } from "react";
import PodcastService from "../services/PodcastService";
import { useSelectedLanguage } from "../context/language";

export const usePodcastSeasonList = () => {
  const { selectedLanguage } = useSelectedLanguage();
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    // returns an unsubscribe function for cleanup
    if (selectedLanguage) {
      return PodcastService.subscribeToSeasons(
        selectedLanguage,
        (err, seasons) => {
          if (err) {
            console.log(err);
          } else {
            setSeasons(seasons);
          }
        }
      );
    }
  }, [selectedLanguage]);

  return {
    seasons
  };
};
