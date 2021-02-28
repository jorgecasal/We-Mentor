import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { toaster } from "evergreen-ui";

import { useSelectedLanguage } from "../context/language";
import QuestionService from "../services/QuestionService";

export const useQuestionDetails = questionId => {
  const history = useHistory();
  const { selectedLanguage } = useSelectedLanguage();

  const [editorQuestion, setEditorQuestion] = useState(null);
  const [documentRef, setDocumentRef] = useState(null);
  const [questionName, setQuestionName] = useState("");
  const [answer, setAnswer] = useState("")
  useEffect(() => {
QuestionService.getQuestionRef(questionId).then(ref=>{

          setDocumentRef(ref);
          console.log(questionId)

         QuestionService.getQuestion(
            questionId
          ).then(data=>{
            if (data) {
              console.log("I  run")
              setQuestionName(data.question);
              setAnswer(data.answer)
              setEditorQuestion({ blocks: data.blocks });
            } else {
              setQuestionName("");
              setEditorQuestion({ blocks: [] });
            }
          });


        });


  }, [selectedLanguage, questionId]);

  const deleteQuestion = (id) => {
      QuestionService.deleteQ(id);
      history.push('/questions')
      toaster.notify(`${questionName} Deleted!`);
  };

  return {
    documentRef,
    editorQuestion,
    setEditorQuestion,
    questionName,
    setQuestionName,
    deleteQuestion,
    answer,
    setAnswer
  };
};
