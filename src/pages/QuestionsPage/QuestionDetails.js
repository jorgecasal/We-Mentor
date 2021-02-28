import React, {useEffect, useState} from "react";
import { useParams } from "react-router";
import { Pane, Menu, TextInputField, Textarea, Select, Button } from "evergreen-ui";

import { ContextMenu } from "../../components/ContextMenu";
import { ContentEditor } from "../../components/ContentEditor";
import { useQuestionDetails } from "../../hooks/useQuestionDetails";
import  ArticlesService  from "../../services/ArticlesService";
import  QuestionService  from "../../services/QuestionService";

export const QuestionDetails = () => {
  const { questionId } = useParams();
  const [articleCategory, setArticleCategory] = useState("")
  const [ articleCatetgoriesList, setArticleCategoriesList ] = useState([]);

  const {
    documentRef,
    editorQuestion,
    setEditorQuestion,
    questionName,
    setQuestionName,
    deleteQuestion,
    answer,
    setAnswer
  } = useQuestionDetails(questionId);

  const save = () => {
    console.log(articleCategory)
    const data = {answer, question: questionName, articleCategoryId: articleCategory}
    QuestionService.updateQuestion(questionId, data)

  }

  const saveCategory = e => setArticleCategory(e.target.value)

  useEffect(()=>{
    ArticlesService.getAllArticles().then(data => setArticleCategoriesList(data))
  })

  return (
    <Pane height="100vh" width={600} overflowY="auto" backgroundColor="white">
      <ContextMenu
        title={questionName}
        menu={
          <Menu>
            <Menu.Group>
              <Menu.Item icon="trash" intent="danger" onSelect={()=>deleteQuestion(questionId)}>
                Ta bort
              </Menu.Item>
            </Menu.Group>
          </Menu>
        }
      />

        <Pane padding={20}>
          <TextInputField
            label="Namn"
            value={questionName}
            onChange={e => setQuestionName(e.target.value)}
          />
        <Textarea
          label="answer"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
        <p>Artikelkategori</p>
        <Select
          width={240}
          onChange={saveCategory}
          >
            <option value={""} ></option>
            {articleCatetgoriesList.map(el => (
              <option value={el.categoryId}>{el.title}</option>
          ))}
        </Select>
      </Pane>
      <Button intent="success" appearance="primary" onClick={save}>
          Spara
      </Button>
    </Pane>
  );
};
