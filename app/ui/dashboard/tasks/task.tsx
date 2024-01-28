import { fetchTaskById } from "@/app/lib/data"

export default async function Task({ id }: { id: string }) {
  const task = await fetchTaskById(id);

  return (
    <>
      <div className="rounded-xl bg-gray-200 p-2 shadow-sm flex-wrap inline-flex flex-col">
        <div className="flex p-4">
          <h3 className="ml-2 text-xl font-medium">{task.title}</h3>
        </div>
        <div className="flex p-4 gap-5">
          <div className="no-wrap">
            <h3>Author</h3>
            <p className={`truncate rounded-xl bg-gray-50 px-4 py-8 text-center text-lg`}>
              {task.author}
            </p>
          </div>
          <div className="no-wrap">
            <h3>Created</h3>
            <p className={`truncate rounded-xl bg-gray-50 px-4 py-8 text-center text-lg`}>
              {task.created}
            </p>
          </div>
          <div className="no-wrap">
            <h3>Finished</h3>
            <p className={`truncate rounded-xl bg-gray-50 px-4 py-8 text-center text-lg`}>
              {task.finished ? task.finished : "Not finished yet"}
            </p>
          </div>
          <div className="no-wrap">
            <h3>Status</h3>
            <p className={`truncate rounded-xl bg-gray-50 px-4 py-8 text-center text-lg`}>
              {task.status}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}