"use client";

import { deleteTaskById, fetchTasks } from '@/app/lib/data';
import { EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import DeleteAlert from '../../alerts/delete-alert';
import { useEffect, useState } from 'react';
import { Status, Task } from '@/app/lib/definitions';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { Badge } from '@/components/ui/badge';

export default function TasksTable() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };

    loadTasks();
  }, []);

  const handleDelete = (taskId: string) => {
    deleteTaskById(taskId)
      .then(value => {
        if (value) {
          toast.success("The task was deleted.")
          setTasks((prevTasks: Task[]) => prevTasks.filter((task) => task.id !== taskId));
        } else {
          toast.error("The task could not be deleted because it does not exist.")
        }
      })
      .catch(e => toast.error("The task could not be deleted."));
  };

  return (
    <div className="mt-6 flow-root mb-8">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {tasks?.map((task: Task) => (
              <div
                key={task.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                {task.title}
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table max-w-xl">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-2 font-semibold text-lg sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-2 font-semibold text-lg">
                  Author
                </th>
                <th scope="col" className="px-3 py-5 font-semibold text-lg">
                  Created
                </th>
                <th scope="col" className="px-3 py-5 font-semibold text-lg">
                  Status
                </th>
                <th scope="col" className="px-3 py-5">
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tasks?.map((task: Task) => (
                <tr
                  key={task.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {task.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {task.author}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {task.created}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Badge variant="outline" className={clsx({
                      'bg-green-400': task.status === Status.completed,
                      'bg-gray-400': task.status === Status.pending,
                      'bg-blue-400': task.status === Status.in_progress,
                    })}>{task.status}</Badge>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 flex gap-4">
                    <Link href={`/dashboard/tasks/${task.id}`}>
                      <EyeIcon className="w-6 hover:text-blue-600 hover:scale-110" />
                    </Link>
                    <DeleteAlert id={task.id} onDelete={handleDelete} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}