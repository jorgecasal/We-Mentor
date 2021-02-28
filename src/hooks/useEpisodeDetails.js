import { useState, useRef, useEffect } from "react";
import PodcastService from "../services/PodcastService";
import { useSelectedLanguage } from "../context/language";
import { useHistory } from "react-router";
import { toaster } from "evergreen-ui";

export const useEpisodeDetails = (seasonId, episodeId) => {
  const history = useHistory();
  const { selectedLanguage } = useSelectedLanguage();

  const [saving, setSaving] = useState(false);
  const [audioUploading, setAudioUploading] = useState(false);

  // const [episode, setEpisode] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [podcastUrl, setPodcastUrl] = useState("");

  const [duration, setDuration] = useState(0);

  const [podcastUploadProgress, setPodcastUploadProgress] = useState(0);

  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    let isSubscribed = true;
    if (seasonId && episodeId) {
      PodcastService.getEpisodeDetails(selectedLanguage, seasonId, episodeId)
        .then(episodeDetails => {
          console.log("Loaded podcast episode", episodeDetails);
          if (isSubscribed) {
            // setEpisode(episodeDetails);
            setName(episodeDetails.name || "");
            setDescription(episodeDetails.description || "");
            setPodcastUrl(episodeDetails.url || "");
            setDuration(episodeDetails.duration || 0);

            setAudioError(false);

            audioRef.current.load();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    return () => {
      isSubscribed = false;
    };
  }, [selectedLanguage, seasonId, episodeId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const metadataLoaded = e => {
        console.log("Duration", e.target.duration);
        if (duration === 0) {
          setDuration(e.target.duration);
        }
      };
      audio.addEventListener("loadedmetadata", metadataLoaded);
      return () => {
        audio.removeEventListener("loadedmetadata", metadataLoaded);
      };
    }
  });

  const uploadPodcast = async file => {
    if (file && file.type.startsWith("audio/") === false) {
      console.log("Invalid podcast format", file.type);
      return;
    }

    try {
      setAudioUploading(true);
      const podcastUrl = await PodcastService.uploadPodcast(
        file,
        setPodcastUploadProgress
      );
      setAudioUploading(false);
      setPodcastUrl(podcastUrl);
      console.log("Audio uploaded successfully", podcastUrl);

      audioRef.current.load();

      await PodcastService.updateEpisodeDetails(
        selectedLanguage,
        seasonId,
        episodeId,
        {
          url: podcastUrl,
          duration
        }
      );
      console.log("Episode updated. Changed podcastUrl");
      toaster.success("Ljudkällan uppdaterades.");
    } catch (err) {
      console.log("ERror uploading", err);
    }
  };

  const saveEpisode = async () => {
    console.log("Saving episode");
    setSaving(true);
    try {
      await PodcastService.updateEpisodeDetails(
        selectedLanguage,
        seasonId,
        episodeId,
        {
          name,
          description,
          duration,
          url: podcastUrl
        }
      );
      console.log("Episode updated");
      toaster.success("Poddavsnitt uppdaterades.");
    } catch (err) {
      console.log(err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteEpisode = () =>
    PodcastService.deleteEpisode(selectedLanguage, seasonId, episodeId)
      .then(() => {
        toaster.info("Podavsnitt togs bort");
        console.log("Episode deleted");
        history.push(`/podcasts/${seasonId}`);
      })
      .catch(err => {
        console.log(
          "Unable to delete episode",
          selectedLanguage,
          seasonId,
          episodeId
        );
      });

  return {
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
    // uploadImage,
    saveEpisode,
    deleteEpisode
  };
};
