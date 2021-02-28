import firebase from "../../firebase";

const getMonthlyInformationRef = (selectedLanguage, contentId) => {
  return firebase
    .firestore()
    .collection("monthlyInformation")
    .doc(selectedLanguage)
    .collection("content")
    .doc(contentId);
};

const getMonthlyInformation = ref =>
  ref.get().then(month => {
    const data = month.data();
    return {
      id: month.id,
      title: `Month ${data.month}`,
      ...data
    };
  });

const getMonths = selectedLanguage =>
  firebase
    .firestore()
    .collection("monthlyInformation")
    .doc(selectedLanguage)
    .collection("content")
    .orderBy("month")
    .get()
    .then(querySnapshot => {
      const addMonths = [];
      querySnapshot.forEach(doc => {
        const month = doc.data();
        month.id = doc.id;
        month.title = `Month ${month.month}`;
        addMonths.push(month);
      });
      return addMonths;
    });


const updateMonthOffers = (monthId, offerId, position) => {

  const db = firebase
              .firestore()
              .collection("monthlyInformation")
              .doc("sv")
              .collection("content")
              .doc(monthId)

    if(position === "1"){
      db.update({"development.offerId1": `${offerId}`});
      db.update({"parent.offerId1": `${offerId}`});
      db.update({"tips.offerId1": `${offerId}`});
    }
    if (position === "2"){
      db.update({"development.offerId2": `${offerId}`});
      db.update({"parent.offerId2": `${offerId}`});
      db.update({"tips.offerId2": `${offerId}`});
    }
};

export default {
  getMonthlyInformationRef,
  getMonthlyInformation,
  getMonths,
  updateMonthOffers
};
