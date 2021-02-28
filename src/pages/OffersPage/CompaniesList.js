import React, { useEffect, useState } from "react";
import { Pane, Menu, Heading } from "evergreen-ui";
import theme from "../../theme";
import { useArticleCategoriesList } from "../../hooks/useArticleCategoriesList";
import { useHistory, Switch, useParams } from "react-router";
import ArticleCategoriesService from "../../services/ArticleCategoriesService";

export const CompaniesList = ({ companies }) => {
  const history = useHistory();
  return (
    <Pane width={250} backgroundColor={theme.colors.grey2} padding={20}>
      <Switch></Switch>
      <Heading>Erbjudande</Heading>
      <Menu.Item
              whiteSpace="nowrap"
              overflow="hidden"
              onSelect={() => {
                history.push(`/offers/banners/gravidinformation`);
              }}
            >
              Bannerytor
      </Menu.Item>
      <Menu.Divider />
      <Pane>
        {companies && companies.length > 0 && (
          <Menu>
            {companies.map(company => (
              <Menu.Item
                // key={company}
                whiteSpace="nowrap"
                overflow="hidden"
                onSelect={() => {
                  history.push(`/offers/${company}/allmant`);
                }}
              >
                {company}
              </Menu.Item>
            ))}
            <Menu.Divider />
          </Menu>
        )}
        <Menu.Item
          whiteSpace="nowrap"
          overflow="hidden"
          icon="add"
          onSelect={() => history.push("/offers/add")}
        >
          Lägg till nytt företag
        </Menu.Item>
      </Pane>
    </Pane>
  );
};
