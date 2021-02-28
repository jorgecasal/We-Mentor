import firebase from "../../firebase";
import { createFirestoreId } from "../../utils/firebase";

const COLLECTION = "offers";
const db = firebase.firestore().collection(COLLECTION);

const allOffersData = () =>
  db.get().then(data => data.docs.map(el => el.data()));

const singleOfferRef = id => db.doc(id);

const getOfferData = id =>
  singleOfferRef(id)
    .get()
    .then(data => data.data());

const subscribeToOffers = callback => {
  return db.onSnapshot({
    next: querySnapshot => {
      callback(
        null,
        querySnapshot.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id
          };
        })
      );
    },
    error: () => {
      const msg = "Error getting bloggers list";
      callback(new Error(msg));
    }
  });
};
const size = () => allOffersData().then(data => data.length);

const addNewCompany = async companyName => {
  const id = createFirestoreId();
  return db.doc(id).set({ company: companyName, id });
};

const updateOffer = (id, details) =>
  singleOfferRef(id).set(details, {
    merge: true
  });

const deleteWeeksField = (id) =>
  singleOfferRef(id).update({
    "weeks": firebase.firestore.FieldValue.delete()
});

const updateCompanyName = async (oldName, newName) => {
  const allData = await allOffersData();
  allData.forEach(el => {
    if (el.id && el.company === oldName) {
      updateOffer(el.id, { ...el, company: newName });
    }
  });
};

const addNewOffer = async (companyName, details) => {
  const id = createFirestoreId();
  db.doc(id).set({ company: companyName, id, ...details });
  return id;
};

const getAllCompanies = async () => {
  const arr = [];
  const allData = await allOffersData();
  allData.forEach(el => {
    if (!arr.includes(el.company)) arr.push(el.company);
  });

  return arr;
};

const flagDeletedOffer = (id, deleted = true) =>
  singleOfferRef(id).set(
    {
      deleted
    },
    {
      merge: true
    }
  );

const restorOffer = id => flagDeletedOffer(id, false);

const deleteOffer = id => singleOfferRef(id).delete();

const deleteCompany = async companyName => {
  const allData = await allOffersData();
  allData.forEach(el => {
    if (el.company === companyName) {
      db.doc(el.id).delete();
    }
  });
};

const flagCompanyDeleted = async companyName => {
  const allData = await allOffersData();
  allData.forEach(el => {
    if (el.company === companyName) {
      flagDeletedOffer(el.id, true);
    }
  });
};

const restoreCompany = async companyName => {
  const allData = await allOffersData();
  allData.forEach(el => {
    if (el.company === companyName) {
      restorOffer(el.id);
    }
  });
};

export default {
  allOffersRef: allOffersData,
  singleOfferRef,
  size,
  addNewCompany,
  addNewOffer,
  flagDeletedOffer,
  deleteOffer,
  subscribeToOffers,
  getOfferData,
  updateOffer,
  updateCompanyName,
  getAllCompanies,
  deleteCompany,
  flagCompanyDeleted,
  restoreCompany,
  deleteWeeksField
};
