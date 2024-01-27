import { fetchTaskById } from "@/app/lib/data"

export default async function Task({ id }: { id: string }) {
  const task = await fetchTaskById(id);

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <h3 className="ml-2 text-sm font-medium">{task.title}</h3>
      </div>
      <p
        className={`truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {task.author}
      </p>
    </div>
  )
}