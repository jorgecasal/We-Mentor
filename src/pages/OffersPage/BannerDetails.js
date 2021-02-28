import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { Pane, Select, Button, Menu } from "evergreen-ui";
import { BannerSurfaces } from "./BannerSurfaces";
import { useArticles } from "../../hooks/useArticles";
import { usePregnancyWeeks } from "../../hooks/usePregnancyWeeks";
import { useChildMonths } from "../../hooks/useChildMonths";
import { ContextMenu } from "../../components/ContextMenu";


import ArticlesService from "../../services/ArticlesService";
import WeeklyInformationService from "../../services/WeeklyInformationService";
import MonthlyInformationService from "../../services/MonthlyInformationService";
import OffersService from "../../services/OffersService";


export const BannerDetails = ({ offers }) => {
  const { surface } = useParams();
  const { articles } = useArticles();
  const { weeks } = usePregnancyWeeks();
  const { months } = useChildMonths();
  const [articleState, setArticleState] = useState([]);
  const [weeksState, setWeeksState] = useState([]);
  const [monthsState, setMonthsState] = useState([]);
  const [offerWeeks, setOfferWeeks] = useState([]);

  const saveToMonthsState = e => {
    const monthId = e.target.name;
    const month = months.find(el => el.id === monthId);
    const position = e.target.parentNode.getAttribute("fieldPosition");
    const offerId = e.target.value;
    setMonthsState(prev => [
      ...prev,
      { monthId, data: { ...month }, offerId, position }
    ]);
  }

  const saveToArticleState = e => {
    const articleId = e.target.name;
    const position = e.target.parentNode.getAttribute("fieldPosition");
    const article = articles.find(el => el.id === articleId);
    const offerId = e.target.value;
    setArticleState(prev => [
      ...prev,
      { articleId, data: { ...article }, offerId, position }
    ]);
  };

  const saveToWeeksState = e => {
    const weekId = e.target.name;
    const week = weeks.find(el => el.id === weekId);
    const position = e.target.parentNode.getAttribute("fieldPosition");
    const offerId = e.target.value;
    setWeeksState(prev => [
      ...prev,
      { weekId, data: { ...week }, offerId, position },
    ]);
  }

  const save = () => {
    if (surface === "barninformation") {
      monthsState.forEach(month => {
        const property = month.position == "1" ? "offerId1" : "offerId2";
        if (month && month.monthId){
          MonthlyInformationService.updateMonthOffers(month.monthId, month.offerId, month.position);
        } 
      });
      setMonthsState([])
    }
    if (surface === "gravidinformation") {
      weeksState.forEach(week => {
        const property = week.position == "1" ? "offerId1" : "offerId2";
        if (week && week.weekId){
          WeeklyInformationService.updateWeekOffers(week.weekId, week.offerId, week.position);
        } 
      });
      setWeeksState([])
    }
    if (surface === "artiklar") {
      articleState.forEach(art => {
        const property = art.position == "1" ? "offerId1" : "offerId2";
        if (art && art.articleId && art.articleId !== "") {
          ArticlesService.updateArticle(art.articleId, {
            ...art.data,
            [property]: art.offerId
          });
        }
      });
      setArticleState([])
    }

  };

  const renderArticles = () => {
    let arr = [];
    for (let i = 0; i < articles.length; i++) {
      const wantedOffers = offers.filter(el => el.title);
      arr.push(
        <Pane width={600}>
          <p className={articles[i].id}>{`Artikel: ${articles[i].title}`}</p>
          <Pane>
            <Select
              width={240}
              name={articles[i].id}
              fieldPosition="1"
              onChange={saveToArticleState}
            >
              <option value={""} ></option>
              <option value={""} >Inget erbjudande</option>
              {wantedOffers.map(el => (
                <option value={el.id}>{el.title}</option>
              ))}
            </Select>
            <Select
              width={240}
              fieldPosition="2"
              name={articles[i].id}
              onChange={saveToArticleState}
            >
              <option value={""} ></option>
              <option value={""} >Inget erbjudande</option>
              {wantedOffers.map(el => (
                <option value={el.id}>{el.title}</option>
              ))}
            </Select>
          </Pane>
        </Pane>
      );
    }
    return arr;
  };

  const renderWeeks = () => {
    let arr = [];
    for (let i = 0; i < weeks.length; i++) {
      let j = i + 1;
      const wantedOffers = offers.filter(el => el.title);
      arr.push(
        <Pane width={600}>
          <p className={weeks[i].id}>{`${weeks[i].title}`}</p>
          <Pane>
            <Select 
              width={240}
              name={weeks[i].id}
              fieldPosition="1"
              onChange={saveToWeeksState}
            >
              <option value={""} ></option>
              <option value={""} >Inget erbjudande</option>
              {wantedOffers.map(el => (
                <option value={el.id}>{el.title}</option>
              ))}
            </Select>
            <Select 
              width={240}
              fieldPosition="2"
              name={weeks[i].id}
              onChange={saveToWeeksState}
              >
              <option value={""} ></option>
              <option value={""} >Inget erbjudande</option>
              {wantedOffers.map(el => (
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
      const wantedOffers = offers.filter(el => el.title);
      arr.push(
        <Pane width={600}>
          <p className={months[i].id}>{`${months[i].title}`}</p>
          <Pane>
            <Select
              width={240}
              name={months[i].id}
              fieldPosition="1"
              onChange={saveToMonthsState}
            >
              <option value={""} ></option>
              <option value={""} >Inget erbjudande</option>
              {wantedOffers.map(el => (
                <option value={el.id}>{el.title}</option>
              ))}
            </Select>
            <Select
              width={240}
              name={months[i].id}
              fieldPosition="2"
              onChange={saveToMonthsState}
            >
              <option value={""} ></option>
              <option value={""} >Inget erbjudande</option>
              {wantedOffers.map(el => (
                <option value={el.id}>{el.title}</option>
              ))}
            </Select>
          </Pane>
        </Pane>
      );
    }
    return arr;
  };

  const render = () => {
    if (surface === "gravidinformation") {
      return renderWeeks();
    }
    if (surface === "barninformation") {
      return renderMonths();
    }
    if (surface === "artiklar") {
      return renderArticles();
    }
  };

  return (
    <Pane display="flex">
      <BannerSurfaces width={400} />
      <Pane>
        <ContextMenu
          title={surface}
        />
        <Menu.Divider />
        <Pane>{render()}</Pane>
        <Button margin={20} intent="success" appearance="primary" onClick={save}>
          Spara
        </Button>
      </Pane>
    </Pane>
  );
};
