'use client';

import { createTaskRecord, fetchTaskRecordsByTaskId, stopTaskRecord } from "@/app/lib/data";
import { TaskRecordDTO } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import { PlayIcon, StopIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TaskRecordsTable({ taskId }: { taskId: string }) {
  const [recording, setRecording] = useState<boolean>(false);
  const [records, setRecords] = useState<TaskRecordDTO[]>([]);
  const [recordingTaskRecord, setRecordingTaskRecord] = useState<TaskRecordDTO>();

  useEffect(() => {
    const loadRecords = async () => {
      const fetchedRecords = await fetchTaskRecordsByTaskId(taskId);
      setRecords(fetchedRecords);
    }

    loadRecords();
  }, []);

  const handleOnClickStart = () => {
    const newRecord = {
      user: '26a19c11-b7fd-4a39-9b1e-cfc59d24a4d1',
      observations: 'The observations could be made after.',
      task: taskId,
    };

    createTaskRecord(newRecord)
      .then(value => {
        if (value) {
          setRecording(true);
          setRecordingTaskRecord(value);
          toast.success("The record started.");
          setRecords((prevTaskRecords: TaskRecordDTO[]) => [...prevTaskRecords, value]);
        } else {
          toast.error("The record could not be started.");
        }
      })
      .catch(e => toast.error("The record could not be started because of a db fail."));
  }

  const handleOnClickStop = () => {
    stopTaskRecord(recordingTaskRecord!)
      .then(value => {
        if (value) {
          stopTaskRecord(recordingTaskRecord!)
            .then(updatedTaskRecord => {
              const recordsCopy = Array.from(records);
              recordsCopy.find(r => r.id === updatedTaskRecord.id)!.end = updatedTaskRecord.end;
              setRecords(recordsCopy);
              setRecording(false);
              setRecordingTaskRecord(undefined);
            });
          toast.success("The record has been stopped successfully.");
        } else {
          toast.error("The record could not be stopped.");
        }
      });
  }

  return (
    <>
      <div className="rounded-xl bg-gray-200 p-2 shadow-sm flex-wrap mt-5">
        <div className="p-4 flex gap-5 items-center">
          <h3 className="font-semibold text-lg">Records</h3>
          <Button variant="outline" className={clsx("hover:bg-green-600 hover:scale-105", {
            'hidden': recording
          })} onClick={handleOnClickStart}>
            <PlayIcon />
          </Button>
          <Button variant="outline" className={clsx("hover:bg-red-600 hover:scale-105", {
            'hidden': !recording
          })} onClick={handleOnClickStop}>
            <StopIcon />
          </Button>
        </div>
        <table className="hidden min-w-full text-gray-900 md:table max-w-xl">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-3 py-2 font-light text-lg sm:pl-6">
                User
              </th>
              <th scope="col" className="px-3 py-2 font-light text-lg">
                Start
              </th>
              <th scope="col" className="px-3 py-5 font-light text-lg">
                End
              </th>
              <th scope="col" className="px-3 py-5 font-light text-lg">
                Observations
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {records?.map((record: TaskRecordDTO) => (
              <tr
                key={record.id}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap px-8 py-3">
                  {record.name}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {record.start.toString()}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {record.end?.toString()}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {record.observations}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>);
}