import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import {
  Menu,
  Pane,
  TextInputField,
  Label,
  Textarea,
  Button,
  Tab
} from "evergreen-ui";
import { ContextMenu } from "../../components/ContextMenu";
import OffersService from "../../services/OffersService";
import {SimpleForm} from "./SimpleForm";
import {SignUpForm} from "./SignUpForm";


export const AddOfferPage = () => {
  const { offerId, companyName } = useParams();
  const [selectedContext, setSelectedContext] = useState("simple")

  const [offer, setOffer] = useState("");
  const history = useHistory();

  const save = () => {
    if(!offer.title || offer.title === ""){
      window.alert("please provide a title for the offer")
    }
    const details = {
      title: offer.title,
      image: offer.image || "",
      intro: offer.intro || "",
      body: offer.body || "",
      banner: offer.banner || "",
      button: {
        text: offer.buttonText || "",
        link: offer.buttonUrl || ""
      },
      inputs: {
        input1: offer.input1 || "",
        input2: offer.input2 || ""
      }
    };

    OffersService.addNewOffer(companyName, details)
      history.push(`/offers/${companyName}/allmant`)
  };

  const render = () => selectedContext === "simple" ? <SimpleForm offer={offer} setOffer={setOffer}/> : <SignUpForm offer={offer} setOffer={setOffer}/>

  return (
    <Pane width={500} backgroundColor="white">
      <ContextMenu
        title={`Add offer for the company: ${companyName}. Title: ${offer.title}`}

      />

      <Menu.Divider />
      <Pane paddingBottom={20}>
      <Tab
        isSelected={selectedContext === "simple"}
        onSelect={() => setSelectedContext("simple")}
      >
        Enkel
      </Tab>
      <Tab
        isSelected={selectedContext === "signUp"}
        onSelect={() => setSelectedContext("signUp")}
      >
        Signa upp
      </Tab>
    </Pane>

      <Pane padding={20}>
        <TextInputField
          label="Erbjudande titel"
          value={offer.title}
          onChange={e => setOffer({ ...offer, title: e.target.value })}
        />
      </Pane>
      <Pane padding={20}>
        <TextInputField
          label="Banner"
          value={offer.banner}
          onChange={e => setOffer({ ...offer, banner: e.target.value })}
        />
        <TextInputField
          label="Bild"
          value={offer.image}
          onChange={e => setOffer({ ...offer, image: e.target.value })}
        />
        <TextInputField
          label="Video"
          value={offer.video}
          onChange={e => setOffer({ ...offer, video: e.target.value })}
        />
      </Pane>
      <Pane padding={20}>
      <TextInputField
          label="Ingress"
          value={offer.intro}
          onChange={e => setOffer({ ...offer, intro: e.target.value })}
        />
        </Pane>
        {render()}

      <Button intent="success" appearance="primary" onClick={save}>
        Spara
      </Button>
    </Pane>
  );
};
