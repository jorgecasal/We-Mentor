import React, { createContext, useContext, useState } from "react";
import { usePodcastSeasonList } from "../hooks/usePodcastSeasonList";

const usePodcast = () => {
  const { seasons } = usePodcastSeasonList();
  const [episodes, setEpisodes] = useState([]);

  return {
    seasons,
    episodes,
    setEpisodes
  };
};

export const PodcastContext = createContext();

export const PodcastProvider = ({ children }) => {
  const state = usePodcast();

  return (
    <PodcastContext.Provider value={state}>{children}</PodcastContext.Provider>
  );
};

export const usePodcastContext = () => useContext(PodcastContext);
