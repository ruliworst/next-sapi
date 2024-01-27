'use client';

import { deleteTaskById } from "@/app/lib/data";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter
} from "@/components/ui/alert-dialog";
import { TrashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function DeleteAlert({ id }: { id: string }) {
  const handleDelete = () => {
    deleteTaskById(id)
      .then(value => value
        ? toast.success("The task was deleted.")
        : toast.error("The task could not be deleted because it does not exist."))
      .catch(e => toast.error("The task could not be deleted."));
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger><TrashIcon className="w-6 hover:text-red-600 hover:scale-110 cursor-pointer" /></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure to delete this task?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the task
            and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="hover:bg-red-600" onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}