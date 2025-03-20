"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getTools } from "@/actions/tool-action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createFeedback } from "@/actions/feedback-action";
import { useAuthStore } from "@/store/auth-store";
import { verifyToken } from "@/actions/login-action";
import { useQueryClientStore } from "@/store/query-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  message: z.string().min(20, {
    message: "Message must be at least 20 characters.",
  }),
  tool: z.string().min(1, {
    message: "Tool must be at least 1 character.",
  }),
});

function FeedbackForm() {
  const { token, clear } = useAuthStore();
  const { queryClient } = useQueryClientStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      tool: "",
    },
  });

  const { data } = useQuery({
    queryKey: ["tools"],
    queryFn: () => getTools(),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!token) {
      return;
    }

    const decodedToken: any = await verifyToken(token);

    if (!decodedToken.success) {
      toast.error("Failed to verify token");
      clear();
      router.push("/auth");
      return;
    }

    await createFeedback({
      message: data.message,
      toolId: Number(data.tool),
      userId: decodedToken?.decoded?.id,
    });
    queryClient.refetchQueries({ queryKey: ["feedbacks"] });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tool"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tool</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tool" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.map((tool) => (
                      <SelectItem key={tool.value} value={tool.value}>
                        {tool.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default FeedbackForm;
