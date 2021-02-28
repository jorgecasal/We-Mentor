import React from "react";
import { useParams, useHistory } from "react-router";
import { Pane } from "evergreen-ui";
import { GeneralView } from "./GeneralView";
import {  OfferView } from "./OfferView";
import { OffersList } from "./OffersList";

export const OfferDetails = ({ offers, setOffers, setCompanies }) => {
  const { offerId } = useParams();

  const render = () => {
    return offerId ? (
      <OfferView offers={offers} setOffers={setOffers} />
    ) : (
      <GeneralView setCompanies={setCompanies} />
    );
  };
  return (
    <Pane display="flex">
      <OffersList width={400} offers={offers} />
      {render()}
    </Pane>
  );
};
