"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDeepResearchStore } from "@/store/deepResearch";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  input: z.string().min(2).max(200),
});

const UserInput = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { setQuestions, setTopic } = useDeepResearchStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        body: JSON.stringify({ topic: values.input }),
      });
      const data = await response.json();
      setTopic(values.input);
      setQuestions(data);
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-[90vw] sm:w-[80vw] xl:w-[50vw]">
      <FormField
        control={form.control}
        name="input"
        render={({ field }) => (
          <FormItem className='flex-1 w-full'>
            <FormControl>
              <Input 
                placeholder="Enter your research topic" 
                {...field} 
                className='rounded-full w-full flex-1 p-4 py-4 sm:py-6 placeholder:text-sm bg-white/60 backdrop-blur-sm border-black/10 border-solid shadow-none'
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className='rounded-full px-6 cursor-pointer' disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Submit'
        )}
      </Button>
    </form>
  </Form>
  );
};

export default UserInput;
