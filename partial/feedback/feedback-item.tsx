import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  const [isExpanded, setIsExpanded] = useState(false);

  const text = feedback.FeedBack.message;
  const isLongText = text.length > 100;
  const shortText = isLongText ? text.slice(0, 100) + "..." : text;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{feedback.User.email}</CardTitle>
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
