import firebase from "../../firebase";

const getSeasons = language =>
  firebase
    .firestore()
    .collection(`podcasts/${language}/seasons`)
    .get()
    .then(({ docs }) => docs.map(doc => ({ ...doc.data(), id: doc.id })));

const getSeason = (language, seasonId) =>
  firebase
    .firestore()
    .collection(`podcasts/${language}/seasons`)
    .doc(seasonId)
    .get()
    .then(doc => ({ ...doc.data(), id: doc.id }));

const subscribeToSeasons = (language, callback) => {
  // returns an unsubscribe function for cleanup
  return firebase
    .firestore()
    .collection(`podcasts/${language}/seasons`)
    .onSnapshot({
      next: querySnapshot => {
        callback &&
          callback(
            null,
            querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
            }))
          );
      },
      error: () => {
        const msg = "Error getting seasons";
        callback && callback(new Error(msg));
      }
    });
};

const getSeasonEpisodes = (language, seasonId) =>
  firebase
    .firestore()
    .collection(`podcasts/${language}/seasons/${seasonId}/episodes`)
    .get()
    .then(({ docs }) => docs.map(doc => ({ ...doc.data(), id: doc.id })));

const subscribeToSeasonEpisodes = (language, seasonId, callback) => {
  // returns an unsubscribe function for cleanup
  return firebase
    .firestore()
    .collection(`podcasts/${language}/seasons/${seasonId}/episodes`)
    .orderBy("sortOrder")
    .onSnapshot({
      next: querySnapshot => {
        callback &&
          callback(
            null,
            querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
            }))
          );
      },
      error: () => {
        const msg = "Error getting season episodes";
        callback && callback(new Error(msg));
      }
    });
};

const getEpisodeDetails = (language, seasonId, episodeId) =>
  firebase
    .firestore()
    .collection(`podcasts/${language}/seasons/${seasonId}/episodes`)
    .doc(episodeId)
    .get()
    .then(doc => ({ ...doc.data(), id: doc.id }));

const updateEpisodeDetails = (language, seasonId, episodeId, details) =>
  firebase
    .firestore()
    .collection(`podcasts/${language}/seasons/${seasonId}/episodes`)
    .doc(episodeId)
    .set(details, { merge: true });

const updateSeasonDetails = (language, seasonId, details) =>
  firebase
    .firestore()
    .collection(`podcasts/${language}/seasons`)
    .doc(seasonId)
    .set(details, { merge: true });

const createEpisode = (language, seasonId, name, description) =>
  firebase
    .firestore()
    .collection(`podcasts/${language}/seasons/${seasonId}/episodes`)
    .add({
      sortOrder: 0,
      name,
      description
    });

const createSeason = (language, name, description) =>
  firebase
    .firestore()
    .collection(`podcasts/${language}/seasons`)
    .add({
      title: name,
      description,
      sortOrder: 0
    });

const getDownloadUrl = ref => data => {
  return firebase
    .storage()
    .ref(ref)
    .child(data.ref.name)
    .getDownloadURL();
};

const setProgressCallback = (task, progressCallback) => {
  task.on("state_changed", function(snapshot) {
    progressCallback(
      Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    );
  });
};

const uploadPodcast = (podcastAsFile, progressCallback) => {
  const uploadTask = firebase
    .storage()
    .ref(`/podcasts/${podcastAsFile.name}`)
    .put(podcastAsFile);

  if (progressCallback) {
    setProgressCallback(uploadTask, progressCallback);
  }

  return uploadTask.then(getDownloadUrl("podcasts"));
};

const uploadPodcastImage = (imageAsFile, progressCallback) => {
  const uploadTask = firebase
    .storage()
    .ref(`/podcast-images/${imageAsFile.name}`)
    .put(imageAsFile);

  if (progressCallback) {
    setProgressCallback(uploadTask, progressCallback);
  }

  return uploadTask.then(getDownloadUrl("podcast-images"));
};

const deleteSeason = (language, seasonId) => {
  const _deleteSeason = firebase
    .app()
    .functions("europe-west1")
    .httpsCallable("deleteSeason");

  const path = `podcasts/${language}/seasons/${seasonId}`;

  return _deleteSeason({ path })
    .then(function(result) {
      console.log("Delete season success: " + JSON.stringify(result));
    })
    .catch(function(err) {
      console.warn(err);
    });
};

const deleteEpisode = (language, seasonId, episodeId) => {
  const _deleteEpisode = firebase
    .app()
    .functions("europe-west1")
    .httpsCallable("deleteEpisode");

  const path = `podcasts/${language}/seasons/${seasonId}/episodes/${episodeId}`;

  return _deleteEpisode({ path })
    .then(function(result) {
      console.log("Delete episode success: " + JSON.stringify(result));
    })
    .catch(function(err) {
      console.warn(err);
    });
};

export default {
  getSeasons,
  getSeason,
  subscribeToSeasons,
  getSeasonEpisodes,
  subscribeToSeasonEpisodes,
  getEpisodeDetails,
  updateEpisodeDetails,
  updateSeasonDetails,
  createEpisode,
  createSeason,
  uploadPodcast,
  uploadPodcastImage,
  deleteSeason,
  deleteEpisode
};
