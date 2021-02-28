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


export const AddCompanyPage = ({setCompanies}) => {
  const { companyName } = useParams();
  const [company, setCompany] = useState("");
  const history = useHistory();

  const save = () => {
    OffersService.addNewCompany(company);
    setCompanies(prev => [...prev,  company]);
    history.push(`/offers/${company}/allmant`);
    setCompany("")
  };

  return (
    <Pane display="flex" width={600}>
      <Pane width={500} backgroundColor="white">
        <ContextMenu
          title={company}
          menu={
            <Menu>
              <Menu.Group>
                <Menu.Item
                  icon="trash"
                  intent="danger"
                >
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
            onChange={e => setCompany( e.target.value)}
          />
        </Pane>

        <Button intent="success" appearance="primary" onClick={save}>
          Spara
        </Button>
      </Pane>
    </Pane>
  );
};
