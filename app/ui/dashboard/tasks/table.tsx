import { fetchTasks } from '@/app/lib/data';

export default async function TasksTable() {
  const tasks = await fetchTasks();

  return (
    <div className="mt-6 flow-root mb-8">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {tasks?.map((task) => (
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
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Author
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tasks?.map((task) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}