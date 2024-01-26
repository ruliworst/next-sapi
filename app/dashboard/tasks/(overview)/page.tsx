import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import TasksTable from "@/app/ui/dashboard/tasks/table";
import { Suspense } from "react";
import { TasksTableSkeleton } from "@/app/ui/skeletons";

export default function Page() {
  const link = {
    name: 'Create new Task',
    href: '/dashboard/tasks/create',
    icon: PlusIcon,
  }

  return (
    <>
      <h2>Tasks</h2>
      <Suspense fallback={<TasksTableSkeleton />}>
        <TasksTable />
      </Suspense>
      <div className='md:max-w-[200px]'>
        <Link key={link.name} href={link.href} className={'flex h-[36px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3'}>
          <PlusIcon className="w-6" />
          <p className="hidden md:block">{link.name}</p>
        </Link>
      </div >
    </>
  );
}