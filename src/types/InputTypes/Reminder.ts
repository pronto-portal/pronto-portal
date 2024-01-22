import { DateRange, GetById, PaginatedInput } from './base';
import { Reminder } from '../ObjectTypes';

export type ReminderInputsType = Pick<Reminder, 'claimantMessage' | 'translatorMessage' | 'cronSchedule'>;
interface CreateReminder extends ReminderInputsType {
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
    input: Omit<Partial<Reminder>, 'id'>;
}

export interface CreateReminderInput {
    input: CreateReminder;
}
