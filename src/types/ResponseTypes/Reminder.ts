import { deleteReminder } from '../../redux/graphql/mutations/deleteReminder';
import { Reminder } from '../ObjectTypes';

export interface GetReminderResponse {
    getReminder: Reminder;
}

export interface GetRemindersResponse {
    getReminders: Reminder[];
}

export interface UpdateReminderResponse {
    updateReminder: Reminder;
}

export interface CreateReminderResponse {
    createReminder: Reminder;
}

export interface DeleteReminderResponse {
    deleteReminder: Reminder;
    data?: {
        response?: {
            data?: {
                deleteReminder?: Reminder;
            };
        };
    };
}
