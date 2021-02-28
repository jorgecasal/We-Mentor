import { useState, useEffect } from "react";

import QuestionService from "../services/QuestionService";

export const useQuestionList = () => {
  const [questionList, setQuestionList] = useState([]);
  const [deletedQuestionList, setDeletedQuestionList] = useState([]);

  useEffect(() => {
    // returns an unsubscribe function for cleanup
    return QuestionService.subscribeToQuestionList((err, items) => {
      if (err) {
        console.log(err);
      } else {
        setQuestionList(items.filter(item => !item.deleted));
        setDeletedQuestionList(items.filter(item => item.deleted));
      }
    });
  }, [setQuestionList]);

  const permanentlyDeleteQuestion = async questionId => {
    try {
      await QuestionService.deleteQuestion(questionId);
    } catch (error) {
      console.log(error);
    }
  };

  const restoreQuestion = async questionId => {
    try {
      await QuestionService.flagDeleted(questionId, false);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    questionList,
    deletedQuestionList,
    restoreQuestion,
    permanentlyDeleteQuestion
  };
};
