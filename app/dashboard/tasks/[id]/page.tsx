import Task from "@/app/ui/dashboard/tasks/task";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  return <Task id={id} />
}