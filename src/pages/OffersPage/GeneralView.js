import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { ContextMenu } from "../../components/ContextMenu";
import OffersService from "../../services/OffersService";

import {
  Pane,
  Menu,
  TextInputField,
  Textarea,
  Label,
  Button
} from "evergreen-ui";


export const GeneralView = ({ setCompanies }) => {
  const { companyName } = useParams();
  const [company, setCompany] = useState("");
  const history = useHistory();
  useEffect(() => {
    setCompany(companyName);
  }, [companyName]);

  const save = () => {
    OffersService.updateCompanyName(companyName, company);
    setCompanies(prev =>
      prev.map(el => (el.company === companyName ? company : el.company))
    );
    history.push(`/offers/${company}/allmant`);
  };

  const toTrash = () => {
    if (
      window.confirm(
        `you are about to delete all the offers from the company: $${company}.  Are you sure you want to proceed?`
      )
    ) {
      OffersService.deleteCompany(company);
      history.push("/");
    }
  };

  return (
    <Pane display="flex" width={600}>
      <Pane width={500} backgroundColor="white">
        <ContextMenu
          title={`${company}`}
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
        <Pane padding={20}>
          <TextInputField
            label="Företagsnamn"
            value={company}
            onChange={e => setCompany(e.target.value)}
          />
        </Pane>

        <Button intent="success" appearance="primary" onClick={save}>
          Spara
        </Button>
      </Pane>
    </Pane>
  );
};
