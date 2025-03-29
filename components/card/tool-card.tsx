import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ToolCardProps = {
  className?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  href: string;
  color?: string;
};

const ToolCard = ({
  className,
  title,
  description,
  icon,
  href,
  color = "primary",
}: ToolCardProps) => {
  return (
    <Link className="w-full md:w-fit perspective-1000" href={href}>
      <Card
        className={cn(
          "w-full md:w-96 md:h-52 group relative overflow-hidden transition-all duration-300 hover:shadow-lg border border-primary/05 hover:border-primary/30 backdrop-blur-sm hover:backdrop-blur-0 hover:translate-y-1 hover:scale-102",
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-all duration-700 group-hover:translate-y-2"></div>

        <CardHeader className="pt-6 pb-3 px-6 flex-row items-center gap-4 font-medium z-10">
          <div className="h-12 w-12 flex items-center justify-center bg-background shadow-sm text-primary rounded-xl group-hover:rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 text-lg">{icon}</div>
          </div>
          <span className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
            {title}
          </span>
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground px-6 z-10 relative">
          <p className="leading-relaxed">{description}</p>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-2 z-10 relative flex justify-between items-center">
          <div className="h-1.5 w-1.5 rounded-full bg-primary/40 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
        </CardFooter>

        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary/50 via-primary to-primary/50 group-hover:w-full transition-all duration-700 ease-out"></div>
        <div className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine"></div>
      </Card>
    </Link>
  );
};

export default ToolCard;
