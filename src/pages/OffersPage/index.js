import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import { Pane } from "evergreen-ui";
import { SidebarComponent } from "../../components/Sidebar";
import { AddCompanyPage } from "./AddCompanyPage";
import { AddOfferPage } from "./AddOfferPage";

import { CompaniesList } from "./CompaniesList";
import { useOffers } from "../../hooks/useOffers";
import { GeneralView } from "./GeneralView";
import { OfferDetails } from "./OfferDetails";
import { BannerDetails } from "./BannerDetails";



export const OffersPage = ({ match }) => {
  const {
    offers,
    deletedOffers,
    companies,
    setCompanies,
    setOffers,
    setDeletedOffers,
    permanentlyDeleteOffer,
    restoreOffer
  } = useOffers();

  return (
    <Pane display="flex">
      <SidebarComponent />
      <CompaniesList companies={companies} />
      <Switch>
        <Route exact path={`${match.url}/add`}
            render={props => (
              <AddCompanyPage
                setCompanies={setCompanies}
                {...props}
              />
          )} />
        <Route exact path={`${match.url}/:companyName/add`} component={AddOfferPage} />
        <Route exact path={`${match.url}/banners/:surface`} render={props => (
              <BannerDetails
                offers={offers}
                {...props}
              />
          )}  />

        <Route
          exact
          path={`${match.url}/:companyName/allmant`}
          render={props => (
            <OfferDetails
              offers={offers}
              setOffers={setOffers}
              setCompanies={setCompanies}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={`${match.url}/:companyName/:offerId`}
          render={props => (
            <OfferDetails
              offers={offers}
              setOffers={setOffers}
              setCompanies={setCompanies}
              {...props}
            />
          )}
        />
      </Switch>
    </Pane>
  );
};
