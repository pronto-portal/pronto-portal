import { Reminder } from "../ObjectTypes";
import { DateRange, GetById, PaginatedInput } from "./base";

interface CreateReminder extends Omit<Partial<Reminder>, "id"> {
  assignmentId: string;
}

export interface GetReminderInput {
  getReminder: GetById;
}

export interface GetRemindersInput {
  input: PaginatedInput;
  where: {
    range: DateRange;
    date: string;
  };
}

export interface UpdateReminderInput {
  input: Omit<Partial<Reminder>, "id">;
}

export interface CreateReminderInput {
  input: CreateReminder;
}
