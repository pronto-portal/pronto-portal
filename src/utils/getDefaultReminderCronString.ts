import moment from 'moment';

export const getDefaultReminderCronString = (dateString: string) => {
    // todo: ensure all date string coming into the backend get converted into utc time

    const dateObj = new Date(dateString);
    const dateTime = moment(dateObj);

    // day before the assignment
    const day = dateTime.date() - 1 <= 0 ? 1 : dateTime.date() - 1;
    const month = dateTime.month() + 1;
    const year = dateTime.year();
    const hour = dateTime.hour();
    const minute = dateTime.minute();

    // min hr day_of_month month day_of_week year
    const cron = `${minute} ${hour} ${day} ${month} ? ${year}`;
    return cron;
};
