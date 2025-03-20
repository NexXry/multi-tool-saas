import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteFeedback } from "@/actions/feedback-action";
import { useQueryClientStore } from "@/store/query-store";
import { useAuthStore } from "@/store/auth-store";
import { verifyToken } from "@/actions/login-action";

type Feedback = {
  FeedBack: {
    id: number;
    message: string;
    createdAt: Date;
    userId: number;
    toolId: number;
  };
  User: {
    email: string;
  };
  Tool: {
    name: string;
  };
};

function FeedbackItem({ feedback }: { feedback: Feedback }) {
  const { token } = useAuthStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const { queryClient } = useQueryClientStore();
  const [isToUser, setIsToUser] = useState(false);

  useEffect(() => {
    if (!token) return;
    verifyToken(token).then((res) => {
      if (!res.success) return;
      setIsToUser(feedback.FeedBack.userId === res.decoded?.id);
    });
  }, [feedback.FeedBack.userId]);

  const text = feedback.FeedBack.message;
  const isLongText = text.length > 100;
  const shortText = isLongText ? text.slice(0, 100) + "..." : text;

  const handleDelete = async (id: number) => {
    await deleteFeedback(id);
    queryClient.refetchQueries({ queryKey: ["feedbacks"] });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between ">
          {feedback.User.email}
          {isToUser && (
            <Trash
              className="ml-2 cursor-pointer hover:text-red-500"
              onClick={() => handleDelete(feedback.FeedBack.id)}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm break-words">
        {isExpanded ? text : shortText}
        {isLongText && (
          <Button variant="link" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "See less" : "See more"}
          </Button>
        )}
      </CardContent>
      <CardFooter>
        <CardTitle>{feedback.Tool.name}</CardTitle>
      </CardFooter>
    </Card>
  );
}

export default FeedbackItem;
