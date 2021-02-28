import { useState, useEffect } from "react";

import OffersService from "../services/OffersService";

export const useOffers = () => {
  const [offers, setOffers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [deletedCompanies, setDeletedCompanies] = useState([]);
  const [deletedOffers, setDeletedOffers] = useState([]);

  useEffect(() => {
    return OffersService.subscribeToOffers((err, items) => {
      if (err) console.log(err);
      else {
        setOffers(items.filter(item => !item.deleted));
        setDeletedOffers(items.filter(item => item.deleted));
      }
    });
  }, []);

  useEffect(() => {
    OffersService.getAllCompanies().then(array => {
      setCompanies(array.filter(company => !company?.deleted));
      // setDeletedCompanies(array.filter(company => company.deleted));
      setCompanies(array)
    });
  }, []);

  const permanentlyDeleteOffer = async OfferId => {
    try {
      await OffersService.deleteOffer(OfferId);
    } catch (error) {
      console.log(error);
    }
  };

  const restoreOffer = async OfferId => {
    try {
      await OffersService.flagDeletedOffer(OfferId, false);
    } catch (error) {
      console.log(error);
    }
  };
  const permanentlyDeleteCompany = async companyName => {
    try {
      await OffersService.deleteCompany(companyName);
    } catch (error) {
      console.log(error);
    }
  };
  const restoreCompany = async companyName => {
    try {
      await OffersService.restoreCompany(companyName);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    offers,
    deletedOffers,
    companies,
    setCompanies,
    setOffers,
    setDeletedOffers,
    permanentlyDeleteOffer,
    restoreOffer,
    deletedCompanies,
    restoreCompany,
    permanentlyDeleteCompany
  };
};
