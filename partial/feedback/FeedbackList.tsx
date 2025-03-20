"use client";
import { getFeedbacks } from "@/actions/feedback-action";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import FeedbackItem from "./feedback-item";

function FeedbackList() {
  const { data } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: () => getFeedbacks(),
  });
  return (
    <div className="w-full mx-auto flex flex-col gap-6">
      {data?.allFeedbacks?.map((feedback) => (
        <FeedbackItem key={feedback.FeedBack.id} feedback={feedback} />
      ))}
    </div>
  );
}

export default FeedbackList;
