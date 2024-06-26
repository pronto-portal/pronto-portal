import { daysOfWeek, daysOfWeekArray, months } from './constants';

export const parseDayOfWeekStringCronPart = (dayOfWeek: string[]) => {
    return dayOfWeek.length === 0 ? ['?'] : dayOfWeek.filter((day) => day !== '*' && day !== '?');
};

const describeReminderCronExpression = (cronExpression: string, selectWeekday?: boolean, selectedIsPM?: boolean) => {
    const cronExpressionParts = cronExpression.split(' ');
    const hour = +cronExpressionParts[1];
    const minute = +cronExpressionParts[0];
    const dayOfMonth = cronExpressionParts[2];
    const preformattedDayOfWeek = (cronExpressionParts[4] || '').split(',');
    const dayOfWeek = parseDayOfWeekStringCronPart(preformattedDayOfWeek);
    const month = cronExpressionParts[3];

    const formattedMonth = month === '?' ? 'every month' : months[+month];
    const formattedDayOfMonth =
        dayOfMonth === '?'
            ? selectWeekday
                ? dayOfWeek.length === 0 || dayOfWeek[0] === '?'
                    ? 'every day'
                    : 'every week'
                : dayOfWeek.length > 0
                  ? 'every week'
                  : 'every day'
            : dayOfMonth;
    const formattedDayOfWeek =
        dayOfMonth === '?'
            ? dayOfWeek
                  .map((day) => (day === '?' ? daysOfWeekArray.join(', ') : daysOfWeek[+day]))
                  .sort((a, b) => daysOfWeekArray.indexOf(a) - daysOfWeekArray.indexOf(b))
                  .join(', ')
                  .trim()
            : '';

    const isPM = selectedIsPM || hour >= 12;
    const convertedHour = hour % 12 === 0 ? 12 : hour % 12;
    const timeFromhourAndDay: string = `${convertedHour}:${minute < 10 ? `0${minute}` : minute} ${isPM ? 'PM' : 'AM'}`;

    return (
        <>
            Your reminder(s) will be sent <b>{formattedMonth}</b>, <b>{formattedDayOfMonth}</b> at <b>{timeFromhourAndDay}</b>
            {formattedDayOfWeek ? (
                <>
                    {' on '} <b> {formattedDayOfWeek} </b>
                </>
            ) : (
                ''
            )}{' '}
        </>
    );
};

export default describeReminderCronExpression;
