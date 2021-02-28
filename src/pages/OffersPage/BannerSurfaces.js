import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Menu, Pane, Heading } from "evergreen-ui";
import theme from "../../theme";
import { useParams } from "react-router";
import { ContextMenu } from "../../components/ContextMenu";


export const BannerSurfaces = () => {
  const history = useHistory();

  return (
    <Pane width={250} padding={10} backgroundColor={theme.colors.grey3}>
      <ContextMenu
          title="Bannerytor"
      />
        <Menu.Divider />
        <Menu.Item
          onSelect={() => {
            history.push(`/offers/banners/gravidinformation`);
          }}
        >
          Gravidinformation
        </Menu.Item>
        <Menu.Item
          onSelect={() => {
            history.push(`/offers/banners/barninformation`);
          }}
        >
          Barninformation
        </Menu.Item>
        <Menu.Item
          onSelect={() => {
            history.push(`/offers/banners/artiklar`);
          }}
        >
          Artiklar
        </Menu.Item>
    </Pane>
  );
};
