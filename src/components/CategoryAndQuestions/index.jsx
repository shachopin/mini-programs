import React, { useState, useEffect } from "react";

const QUESTIONS_API_BASE_URL = "https://api.frontendexpert.io/api/fe/questions";
const SUBMISSIONS_API_BASE_URL =
  "https://api.frontendexpert.io/api/fe/submissions";

export default function QuestionList() {
  // Write your code here.
  const [questions, submissions] = useQuestionsAndSubmissions();
  const categoryToQuestions = getCategoryToQuestion(questions);
  const questionIdToStatus = getQuestionIdToStatus(submissions);
  const categories = Object.keys(categoryToQuestions);

  return (
    <>
      {categories.map((category) => (
        <Category
          key={category}
          category={category}
          questions={categoryToQuestions[category]}
          questionIdToStatus={questionIdToStatus}
        />
      ))}
    </>
  );
}

function Category({ category, questions, questionIdToStatus }) {
  const totalQuestions = questions.length;
  const numQuestionsCorrect = questions.reduce((sum, question) => {
    return questionIdToStatus[question.id] === "CORRECT" ? sum + 1 : sum;
  }, 0);
  return (
    <div className="category">
      <h2>
        {category} - {numQuestionsCorrect} / {totalQuestions}
      </h2>
      {questions.map((question) => {
        return (
          <Question
            key={question.id}
            question={question}
            questionIdToStatus={questionIdToStatus}
          />
        );
      })}
    </div>
  );
}

function Question({ question, questionIdToStatus }) {
  const status = questionIdToStatus[question.id];
  const statusClass =
    status == null ? "unattempted" : status.toLowerCase().replace("_", "-");

  return (
    <div className="question">
      <div className={`status ${statusClass}`} />
      <h3>{question.name}</h3>
    </div>
  );
}

const useQuestionsAndSubmissions = () => {
  const [questions, setQuestions] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [questionRes, submissionRes] = await Promise.all([
        fetch(QUESTIONS_API_BASE_URL),
        fetch(SUBMISSIONS_API_BASE_URL),
      ]);
      const [questions, submissions] = await Promise.all([
        questionRes.json(),
        submissionRes.json(),
      ]);
      setQuestions(questions);
      setSubmissions(submissions);
    };
    fetchData();
  }, []);

  return [questions, submissions];
};

function getCategoryToQuestion(questions) {
  const categoryToQuestions = {};
  for (const { category, ...question } of questions) {
    if (!categoryToQuestions.hasOwnProperty(category)) {
      categoryToQuestions[category] = [];
    }
    categoryToQuestions[category].push(question);
  }

  return categoryToQuestions;
}

function getQuestionIdToStatus(submissions) {
  return submissions.reduce((acc, cur) => {
    acc[cur.questionId] = cur.status;
    return acc;
  }, {});
}
