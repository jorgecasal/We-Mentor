import React, { useEffect, useState } from "react";
import { TextInputField, Textarea, Pane, Label } from "evergreen-ui";
import { useParams } from "react-router";

export const SimpleForm = ({ offer, setOffer }) => {
  const handler = e => {
    const text = e.target.value;
    const property = e.target.name;
    setOffer(prev => ({ ...prev, [property]: text }));
  };

  return (
    <Pane>
      <Pane padding={20}>
        <Label htmlFor="body" marginBottom={4} display="block">
          Brödtext
        </Label>
        <Textarea name="body" value={offer.body} onChange={handler} />
      </Pane>
      <Pane padding={20}>
        <TextInputField
          label="Knapp-text"
          name="buttonText"
          value={offer.buttonText}
          onChange={handler}
        />
        <Label htmlFor="offer-body" marginBottom={4} display="block">
          Knapp URL
        </Label>
        <TextInputField
          name="buttonUrl"
          value={offer.buttonUrl}
          onChange={handler}
        />
      </Pane>
    </Pane>
  );
};
