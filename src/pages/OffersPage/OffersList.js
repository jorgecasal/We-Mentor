import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Menu, Pane, Heading } from "evergreen-ui";
import theme from "../../theme";
import { useParams } from "react-router";

export const OffersList = ({ offers }) => {
  const history = useHistory();
  const { companyName } = useParams();
  const render = () => {
    if (offers) {
      const wantedOffers = offers.filter(
        el => el.company == companyName && !el.deleted && el.title
      );
      return wantedOffers.map(offer => (
        <Menu.Item
          onSelect={() => {
            history.push(`/offers/${companyName}/${offer.id}`);
          }}
        >
          {offer.title || offer.id}
        </Menu.Item>
      ));
    }
  };

  return (
    <Pane width={250} padding={20} backgroundColor={theme.colors.grey3}>
      <Heading>{companyName ? companyName : ""}</Heading>
      <Pane>
        <Menu.Item
          key={companyName}
          whiteSpace="nowrap"
          overflow="hidden"
          onSelect={() => {
            history.push(`/offers/${companyName}/allmant`);
          }}
        >
          Allmänt
        </Menu.Item>
        <Menu.Divider />

        {render()}

        <Menu.Item
          whiteSpace="nowrap"
          overflow="hidden"
          icon="add"
          onSelect={() => history.push(`/offers/${companyName}/add`)}
        >
          Lägg till nytt erbjudande
        </Menu.Item>
      </Pane>
    </Pane>
  );
};
