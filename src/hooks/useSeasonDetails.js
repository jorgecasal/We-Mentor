import { useState, useEffect } from "react";
import { toaster } from "evergreen-ui";
import { useSelectedLanguage } from "../context/language";
import PodcastService from "../services/PodcastService";

const defaultImageUrl = "https://dummyimage.com/300x300/fc0/fff.jpg&text=BJ";

export const useSeasonDetails = seasonId => {
  const { selectedLanguage } = useSelectedLanguage();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [promoted, setPromoted] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [podcastImageUrl, setPodcastImageUrl] = useState(defaultImageUrl);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  useEffect(() => {
    if (seasonId) {
      PodcastService.getSeason(selectedLanguage, seasonId)
        .then(season => {
          setLoading(false);

          setTitle(season.title);
          setDescription(season.description);
          setPromoted(season.promoted || false);
          setPodcastImageUrl(season.imageUrl || defaultImageUrl);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [selectedLanguage, seasonId]);

  const uploadImage = async file => {
    if (file && file.type.startsWith("image/") === false) {
      console.log("Invalid podcast image");
      return;
    }

    try {
      setImageUploading(true);
      const imageUrl = await PodcastService.uploadPodcastImage(
        file,
        setImageUploadProgress
      );
      setPodcastImageUrl(imageUrl);
      setImageUploading(false);
      console.log("Image uploaded successfully", imageUrl);

      await PodcastService.updateSeasonDetails(selectedLanguage, seasonId, {
        imageUrl
      });
      console.log("Podcast updated. Changed imageUrl");
      toaster.success("Omslaget uppdaterades.");
    } catch (err) {
      console.log("Error uploading", err);
    }
  };

  const saveSeason = () => {
    setSaving(true);

    return PodcastService.updateSeasonDetails(selectedLanguage, seasonId, {
      title,
      description,
      promoted,
      imageUrl: podcastImageUrl
    })
      .then(() => {
        setSaving(false);
        console.log("Season saved", selectedLanguage, seasonId);
      })
      .catch(err => {
        setSaving(false);
        console.log("Error saving season details", selectedLanguage, seasonId);
      });
  };

  const deleteSeason = () => {
    return PodcastService.deleteSeason(selectedLanguage, seasonId)
      .then(() => {
        console.log("Season deleted", selectedLanguage, seasonId);
      })
      .catch(err => {
        console.log("Error deleting season", selectedLanguage, seasonId);
      });
  };

  return {
    loading,
    title,
    setTitle,
    description,
    setDescription,
    promoted,
    setPromoted,
    podcastImageUrl,
    setPodcastImageUrl,
    imageUploading,
    imageUploadProgress,
    uploadImage,
    saving,
    saveSeason,
    deleteSeason
  };
};
