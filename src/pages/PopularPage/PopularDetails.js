import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { Pane, Select, Button, Menu } from "evergreen-ui";
import { usePregnancyWeeks } from "../../hooks/usePregnancyWeeks";
import { useChildMonths } from "../../hooks/useChildMonths";
import ArticlesService from "../../services/ArticlesService";
import { ContextMenu } from "../../components/ContextMenu";

export const PopularDetails = () => {
  const { id } = useParams();
  const { weeks } = usePregnancyWeeks();
  const { months } = useChildMonths();
  const [articlesState, setArticleState] = useState([]);

  useEffect(()=>{
    ArticlesService.getAllArticles().then(data => setArticleState(data))
  }, [])

  const renderWeeks = () => {
    let arr = [];
    for (let i = 0; i < weeks.length; i++) {
      arr.push(
        <Pane width={1300}>
          <p className={weeks[i].id}>{`${weeks[i].title}`}</p>
          <Pane>
            <Select 
              width={240}
            >
              <option value={""} ></option>
              {articlesState.map(el => (
                <option value={el.id}>{el.title}</option>
              ))}
            </Select>
            <Select 
              width={240}
            >
              <option value={""} ></option>
              {articlesState.map(el => (
                <option value={el.id}>{el.title}</option>
              ))}
            </Select>
            <Select 
              width={240}
            >
              <option value={""} ></option>
              {articlesState.map(el => (
                <option value={el.id}>{el.title}</option>
              ))}
            </Select>
            <Select 
              width={240}
            >
              <option value={""} ></option>
              {articlesState.map(el => (
                <option value={el.id}>{el.title}</option>
              ))}
            </Select>
            <Select 
              width={240}
            >
              <option value={""} ></option>
              {articlesState.map(el => (
                <option value={el.id}>{el.title}</option>
              ))}
            </Select>
          </Pane>
        </Pane>
      );
    }
    return arr;
  };

  const renderMonths = () => {
    let arr = [];
    for (let i = 0; i < months.length; i++) {
      arr.push(
        <Pane width={1300}>
          <p className={months[i].id}>{`${months[i].title}`}</p>
          <Pane width={1300}>
            <Select
              width={240}
            >
              <option value={""} ></option>
              {articlesState.map(el => (
                <option value={el.id}>{el.title}</option>
              ))}
            </Select>
            <Select
              width={240}
            >
              <option value={""} ></option>
              {articlesState.map(el => (
                <option value={el.id}>{el.title}</option>
              ))}
            </Select>
            <Select
              width={240}
            >
              <option value={""} ></option>
              {articlesState.map(el => (
                <option value={el.id}>{el.title}</option>
              ))}
            </Select>
            <Select
              width={240}
            >
              <option value={""} ></option>
              {articlesState.map(el => (
                <option value={el.id}>{el.title}</option>
              ))}
            </Select>
            <Select
              width={240}
            >
              <option value={""} ></option>
              {articlesState.map(el => (
                <option value={el.id}>{el.title}</option>
              ))}
            </Select>
          </Pane>
        </Pane>
      );
    }
    return arr;
  };

  return (
    <Pane margin={30}>
        <ContextMenu
          title="Poplulärt"
      />
        <Menu.Divider />
        <h4>Veckor</h4>
      <Pane>{renderWeeks()}</Pane>
      <h4>Månader</h4>
      <Pane>{renderMonths()}</Pane>
      <Button intent="success" appearance="primary">
        Spara
      </Button>
    </Pane>
  );
};
