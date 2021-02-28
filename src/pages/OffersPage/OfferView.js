import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Menu, Pane, TextInputField, Tab, Button } from "evergreen-ui";
import { ContextMenu } from "../../components/ContextMenu";
import OffersService from "../../services/OffersService";


import { SimpleForm } from "./SimpleForm";
import { SignUpForm } from "./SignUpForm";

export const OfferView = props => {
  const { offerId, companyName } = useParams();
  const [selectedContext, setSelectedContext] = useState("simple");

  const find = () => {
    return props.offers.find(el => el.id == offerId) || {};
  };
  const [currentOffer, setCurrentOffer] = useState(find());
  const history = useHistory();

  useEffect(() => {
    setCurrentOffer({
      ...find(),
      buttonText: currentOffer.button?.text || "",
      buttonUrl: currentOffer.button?.link || "",
      input1: currentOffer.inputs?.input1 || "",
      input2: currentOffer.inputs?.input2|| ""
    });
  }, [offerId]);

  const save = () => {
    if(!currentOffer.title || currentOffer.title === ""){
      window.alert("please provide a title for the offer")
    }
    const details = {
      title: currentOffer.title || "",
      image: currentOffer.image || "",
      intro: currentOffer.intro || "",
      body: currentOffer.body || "",
      banner: currentOffer.banner || "",
      company: companyName,
      button: {
        text: currentOffer.buttonText || "",
        link: currentOffer.buttonUrl || ""
      },
      terms: currentOffer.terms || "",
      termsTarget: currentOffer.termsTarget || "",
      inputs: {
        input1: currentOffer.input1 || "",
        input2: currentOffer.input2 || ""
      }
    };

    OffersService.updateOffer(offerId, details);
    history.push(`/offers/${companyName}/${offerId}`);
  };

  const render = () =>
    selectedContext === "simple" ? (
      <SimpleForm offer={currentOffer} setOffer={setCurrentOffer} />
    ) : (
      <SignUpForm offer={currentOffer} setOffer={setCurrentOffer} />
    );

    const toTrash = () => {
      OffersService.flagDeletedOffer(offerId);
      history.push(`/offers/${companyName}/allmant`);
    }
  return (
    <Pane width={500} backgroundColor="white">
      <ContextMenu
        title={`Edit offer from company: ${companyName}. Title: ${currentOffer.title}`}
        menu={
          <Menu>
            <Menu.Group>
              <Menu.Item icon="trash" intent="danger" onSelect={toTrash}>
                Ta bort
              </Menu.Item>
            </Menu.Group>
          </Menu>
        }
      />

      <Menu.Divider />
      <Pane paddingBottom={10}>
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

      <Pane padding={10}>
        <TextInputField
          label="Offer titel"
          value={currentOffer.title}
          onChange={e =>
            setCurrentOffer({ ...currentOffer, title: e.target.value })
          }
        />
      </Pane>
      <Pane padding={10}>
        <TextInputField
          label="Banner"
          value={currentOffer.banner}
          onChange={e =>
            setCurrentOffer({ ...currentOffer, banner: e.target.value })
          }
        />
        <TextInputField
          label="Bild"
          value={currentOffer.image}
          onChange={e =>
            setCurrentOffer({ ...currentOffer, image: e.target.value })
          }
        />
        <TextInputField
          label="Video"
          value={currentOffer.video}
          onChange={e =>
            setCurrentOffer({ ...currentOffer, video: e.target.value })
          }
        />
      </Pane>
      <Pane padding={10}>
        <TextInputField
          label="Ingress"
          value={currentOffer.intro}
          onChange={e =>
            setCurrentOffer({ ...currentOffer, intro: e.target.value })
          }
        />
      </Pane>
      {render()}

      <Button intent="success" appearance="primary" onClick={save}>
        Spara
      </Button>
    </Pane>
  );
};
