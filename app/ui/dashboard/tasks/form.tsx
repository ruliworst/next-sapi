'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createTask, fetchUsers } from "@/app/lib/data"
import { useEffect, useState } from "react"
import { User } from "@/app/lib/definitions";
import { toast } from 'react-hot-toast';

export default function CreateTaskForm() {
  const [users, setUsers] = useState<null | User[]>(null)

  useEffect(() => {
    fetchUsers().then(users => setUsers(users));
  })

  const formSchema = z.object({
    title: z.string().min(3, {
      message: "Name must be at least 2 characters.",
    }),
    author: z.string().min(3, {
      message: "The task should has an author."
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const queryResult = createTask(values);

    queryResult
      .then(value => toast.success('The task was created.'))
      .catch(e => toast.error("The task could not be created."));
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-96">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Task 1" {...field} />
                </FormControl>
                <FormDescription>
                  The title of the task.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an author." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users ? users.map(user => <SelectItem value={user.id} key={user.id}>{user.name}</SelectItem>) : <SelectItem value="author">Author</SelectItem>}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}