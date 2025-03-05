import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight, Shapes } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ToolCardProps = {
  className?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  href: string;
};

const ToolCard = ({
  className,
  title,
  description,
  icon,
  href,
}: ToolCardProps) => {
  return (
    <Link className="w-full md:w-fit" href={href}>
      <Card
        className={cn(
          "w-full md:w-96 md:h-48 md:max-w-xs shadow-none",
          className
        )}
      >
        <CardHeader className="pt-4 pb-4 px-5 flex-row items-center gap-3 font-semibold">
          <div className="h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full">
            {icon}
          </div>
          {title}
        </CardHeader>

        <CardContent className="text-[15px] text-muted-foreground px-5">
          <p>{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ToolCard;
