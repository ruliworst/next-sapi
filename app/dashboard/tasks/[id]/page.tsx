import Task from "@/app/ui/dashboard/tasks/task";
import TaskRecordsTable from "@/app/ui/dashboard/tasks/task-records";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;


  return (<>
    <Task id={id} />
    <TaskRecordsTable taskId={id} />
  </>);
}