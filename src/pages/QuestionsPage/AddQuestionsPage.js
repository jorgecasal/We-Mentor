import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Pane, Menu, TextInputField, Textarea, Label, Button, Select } from "evergreen-ui";
import { ContextMenu } from "../../components/ContextMenu";
import QuestionService from "../../services/QuestionService";
import ArticlesService from "../../services/ArticlesService"

export const AddQuestionsPage = () => {
  const { questionId } = useParams(); 
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const history = useHistory();
  const [ articleCatetgoriesList, setArticleCategoriesList ] = useState([]);
  const [articleCategory, setArticleCategory] = useState("")

  const saveCategory = e => setArticleCategory(e.target.value)

  useEffect(()=>{
    ArticlesService.getAllArticles().then(data => setArticleCategoriesList(data))
  }, [questionId])


  const save = () => {

    if(question === ""){
      window.alert("Please provide a question")
    } else {
      const data = {
        question,
        answer,
        articleCategoryId: articleCategory
      };
      QuestionService.addNewQuestion(data).then(data => {
        history.push(`/questions/${data.id}/`)
      });
    }
  };

  return (
    <Pane display="flex" width={600}>
      <Pane width={500} backgroundColor="white">
        <ContextMenu
          question={question}
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
            label="Fråga"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Label htmlFor="Beskrivning" marginBottom={4} display="block">
            Svar
          </Label>
          <Textarea
            name="Svar"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
        </Pane>
        {/* <TextInputField
            label="Mall"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          />
          <TextInputField
            label="Ikon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
          <Checkbox
            checked={checked}
            onChange={(e)=> setChecked(e.target.checked)}
            margin={10}
            label="Synlig på upptäckt"
        /> */}
        <Select
          width={240}
          onChange={saveCategory}
          >
            <option value={""} ></option>
            {articleCatetgoriesList.map(el => (
              <option value={el.categoryId}>{el.title}</option>
          ))}
        </Select>
        <Button intent="success" appearance="primary" onClick={save} >
          Lägg till
        </Button>
      </Pane>
    </Pane>
  );
};