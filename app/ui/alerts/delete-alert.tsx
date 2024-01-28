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

export default function DeleteAlert({ id, onDelete }: { id: string, onDelete: Function }) {
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
          <AlertDialogAction className="hover:bg-red-600" onClick={() => onDelete(id)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}