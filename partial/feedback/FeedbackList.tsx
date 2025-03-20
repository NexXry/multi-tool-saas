"use client";
import { getFeedbacks } from "@/actions/feedback-action";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import FeedbackItem from "./feedback-item";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

function FeedbackList() {
  const [search, setSearch] = useState("");

  const { data } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: () => getFeedbacks(),
  });

  const filteredFeedbacks =
    data?.allFeedbacks
      ?.filter((feedback) => {
        const lowerCaseSearch = search.toLowerCase();
        const lowerCaseMessage = feedback.FeedBack.message.toLowerCase();
        const lowerCaseName = feedback.User.email.toLowerCase();
        const lowerCaseTool = feedback.Tool.name.toLowerCase();
        return (
          lowerCaseMessage.includes(lowerCaseSearch) ||
          lowerCaseName.includes(lowerCaseSearch) ||
          lowerCaseTool.includes(lowerCaseSearch)
        );
      })
      .reverse() || [];

  return (
    <div className="w-full flex flex-col gap-6">
      <Separator />
      <Input
        placeholder="Search"
        className="w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="w-full mx-auto flex flex-col gap-6 overflow-y-auto max-h-[400px] px-2">
        {filteredFeedbacks.map((feedback) => (
          <FeedbackItem key={feedback.FeedBack.id} feedback={feedback} />
        ))}
      </div>
    </div>
  );
}

export default FeedbackList;
