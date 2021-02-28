import React, { useEffect, useState } from "react";
import { Menu, Pane, TextInputField, Tab, Button } from "evergreen-ui";

export const SignUpForm = ({ offer, setOffer }) => {
  const handler = e => {
    const text = e.target.value;
    const property = e.target.name;
    setOffer(prev => ({ ...prev, [property]: text }));
  };

  return (
    <Pane>
      <Pane padding={20}>
        <TextInputField
          label="Terms"
          name="terms"
          value={offer.terms}
          onChange={handler}
        />
      </Pane>
      <Pane padding={20}>
        <TextInputField
          label="Link to Terms"
          name="termsTarget"
          value={offer.termsTarget}
          onChange={handler}
        />

        <TextInputField
          label="Input field 1"
          name="input1"
          value={offer.input1}
          onChange={handler}
        />
        <TextInputField
          label="Input field 2"
          name="input2"
          value={offer.input2}
          onChange={handler}
        />
      </Pane>
    </Pane>
  );
};
