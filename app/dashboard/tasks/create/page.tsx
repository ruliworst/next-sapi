import CreateTaskForm from "@/app/ui/dashboard/tasks/form";
import { CardSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <h2>Create task</h2>
      <Suspense fallback={<CardSkeleton />}>
        <CreateTaskForm />
      </Suspense>
    </>);
}