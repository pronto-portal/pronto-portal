import { api } from './apiReducer';
import { CreateReminderInput, GetRemindersInput, UpdateReminderInput, GetReminderInput, GetById } from '../../types/InputTypes';
import {
    CreateReminderResponse,
    GetRemindersResponse,
    UpdateReminderResponse,
    GetReminderResponse,
    DeleteReminderResponse,
} from '../../types/ResponseTypes/Reminder';
import { createReminder } from '../graphql/mutations/createReminder';
import { deleteReminder } from '../graphql/mutations/deleteReminder';
import { updateReminder } from '../graphql/mutations/updateReminder';
import { getReminder } from '../graphql/queries/getReminder';
import { getReminders } from '../graphql/queries/getReminders';

export const reminderReducer = api.injectEndpoints({
    endpoints: (builder) => ({
        getReminder: builder.query<GetReminderResponse, GetReminderInput>({
            query: (variables) => ({
                document: getReminder,
                variables,
            }),
            providesTags: [{ type: 'Reminder', id: 'current' }],
        }),
        getReminders: builder.query<GetRemindersResponse, GetRemindersInput>({
            query: (variables) => ({
                document: getReminders,
                variables,
            }),
            providesTags: [{ type: 'Reminders', id: 'current' }],
        }),
        updateReminder: builder.mutation<UpdateReminderResponse, UpdateReminderInput>({
            query: (variables) => ({
                document: updateReminder,
                variables,
            }),
            invalidatesTags: [
                { type: 'Reminders', id: 'current' },
                { type: 'Reminder', id: 'current' },
                { type: 'Assignments', id: 'current' },
            ],
        }),
        deleteReminder: builder.mutation<DeleteReminderResponse, GetById>({
            query: (variables) => ({
                document: deleteReminder,
                variables,
            }),
            invalidatesTags: [
                { type: 'Reminders', id: 'current' },
                { type: 'Reminder', id: 'current' },
                { type: 'Assignments', id: 'current' },
            ],
        }),
        createReminder: builder.mutation<CreateReminderResponse, CreateReminderInput>({
            query: (variables) => ({
                document: createReminder,
                variables,
            }),
            invalidatesTags: [
                { type: 'Reminder', id: 'current' },
                { type: 'Assignments', id: 'current' },
            ],
        }),
    }),
});

export const { useGetReminderQuery, useGetRemindersQuery, useUpdateReminderMutation, useCreateReminderMutation, useDeleteReminderMutation } = reminderReducer;
