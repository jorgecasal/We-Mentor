import firebase from "../../firebase";

const getWeeklyInformationRef = (selectedLanguage, contentId) => {
  return firebase
    .firestore()
    .collection("weeklyInformation")
    .doc(selectedLanguage)
    .collection("content")
    .doc(contentId);
};

const getWeeklyInformation = ref =>
  ref.get().then(week => {
    const data = week.data();
    return {
      id: week.id,
      title: `Vecka ${data.week}`,
      ...data
    };
  });

const getWeeks = selectedLanguage =>
  firebase
    .firestore()
    .collection("weeklyInformation")
    .doc(selectedLanguage)
    .collection("content")
    .orderBy("week")
    .get()
    .then(querySnapshot => {
      const addWeeks = [];
      querySnapshot.forEach(doc => {
        const week = doc.data();
        week.id = doc.id;
        week.title = `Vecka ${week.week}`;
        addWeeks.push(week);
      });
      return addWeeks;
    });

const updateWeekOffers = (weekId, offerId, position) => {

  const db = firebase
              .firestore()
              .collection("weeklyInformation")
              .doc("sv")
              .collection("content")
              .doc(weekId)

    if(position === "1"){
      db.update({"child.offerId1": `${offerId}`});
      db.update({"mother.offerId1": `${offerId}`});
      db.update({"partner.offerId1": `${offerId}`});
    }
    if (position === "2"){
      db.update({"child.offerId2": `${offerId}`});
      db.update({"mother.offerId2": `${offerId}`});
      db.update({"partner.offerId2": `${offerId}`});
    }
};

export default {
  getWeeklyInformationRef,
  getWeeklyInformation,
  getWeeks,
  updateWeekOffers
};
