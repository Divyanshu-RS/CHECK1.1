/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useDeepResearchStore } from "@/store/deepResearch";
import React, { useEffect } from "react";
import QuestionForm from "./QuestionForm";
import { useChat } from "@ai-sdk/react";
import ResearchActivities from "./ResearchActivities";
import ResearchReport from "./ResearchReport";
import ResearchTimer from "./ResearchTimer";
import CompletedQuestions from "./CompletedQuestions";

const QnA = () => {
  const {
    questions,
    isCompleted,
    topic,
    answers,
    setIsLoading,
    setActivities,
    setSources,
    setReport,
  } = useDeepResearchStore();

  const { append, data, isLoading} = useChat({
    api: "/api/deep-research",
  });


  useEffect(() => {
    if (!data) return;

    // extract activities and sources
    const messages = data as unknown[];
    const activities = messages
      .filter(
        (msg) => typeof msg === "object" && (msg as any).type === "activity"
      )
      .map((msg) => (msg as any).content);

    setActivities(activities);

    const sources = activities
      .filter(
        (activity) =>
          activity.type === "extract" && activity.status === "complete"
      )
      .map((activity) => {
        const url = activity.message.split("from ")[1];
        return {
          url,
          title: url?.split("/")[2] || url,
        };
      });
    setSources(sources);
    const reportData = messages.find(
      (msg) => typeof msg === "object" && (msg as any).type === "report"
    );
    const report =
      typeof (reportData as any)?.content === "string"
        ? (reportData as any).content
        : "";
    setReport(report);

    setIsLoading(isLoading);
  }, [data, setActivities, setSources, setReport, setIsLoading, isLoading]);

  useEffect(() => {
    if (isCompleted && questions.length > 0) {
      const clarifications = questions.map((question, index) => ({
        question: question,
        answer: answers[index],
      }));

      append({
        role: "user",
        content: JSON.stringify({
          topic: topic,
          clarifications: clarifications,
        }),
      });
    }
  }, [isCompleted, questions, answers, topic, append]);

  if (questions.length === 0) return null;

  return (
    <div className="flex gap-4 w-full flex-col items-center mb-16">
      <QuestionForm />
      <CompletedQuestions />
      <ResearchTimer />
      <ResearchActivities />
      <ResearchReport />
    </div>
  );
};

export default QnA;
