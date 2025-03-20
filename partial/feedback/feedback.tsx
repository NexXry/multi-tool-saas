"use client";

import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";
import { verifyToken } from "@/actions/login-action";
import FeedbackForm from "@/partial/feedback/feedback-form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FeedbackList from "@/partial/feedback/FeedbackList";
import { useQueryClientStore } from "@/store/query-store";

function Feedback() {
  const { queryClient } = useQueryClientStore();
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) return;

    verifyToken(token ?? "").then((res) => {
      if (!res.success) {
        return;
      }
    });
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full md:w-10/12 mx-auto flex flex-col gap-6">
        <FeedbackForm />
        <FeedbackList />
      </div>
    </QueryClientProvider>
  );
}

export default Feedback;
