export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export enum Status {
  pending = "Pending",
  in_progress = "In progress",
  completed = "Completed",
};

export type Task = {
  id: string;
  title: string;
  author: string;
  created: string;
  finished: string | undefined;
  status: Status;
};

export type TaskRecord = {
  id: string;
  userid: string;
  start: string;
  end: string | undefined;
  observations: string;
  task: string;
};

export type TaskRecordDTO = {
  id: string;
  name: string;
  start: string;
  end: string | undefined;
  observations: string;
};