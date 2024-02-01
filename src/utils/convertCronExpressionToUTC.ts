import moment from 'moment';

const convertCronExpressionToUTC = (cronExpression: string): string => {
    const cronArray = cronExpression.split(' ');
    const minute = parseInt(cronArray[0]);
    const hour = parseInt(cronArray[1]);
    const day = cronArray[2];
    const month = cronArray[3];
    const dayOfWeek = cronArray[4];

    const year = isNaN(parseInt(cronArray[5])) ? new Date().getFullYear() : parseInt(cronArray[5]);

    // Handle wildcard or '?' for day and month
    const tempDay = day === '?' || day === '*' ? 15 : parseInt(day);
    const tempMonth = month === '?' || month === '*' ? 6 : parseInt(month);

    const localDate = new Date(year, tempMonth - 1, tempDay, hour, minute);

    // Convert to UTC
    const momentLocalDate = moment(localDate);
    const utcDate = momentLocalDate.utc();

    const finalMonth = month === '?' || month === '*' ? month : utcDate.month() + 1;
    const finalDate = day === '?' || day === '*' ? day : utcDate.date();

    const utcCronExpression = `${utcDate.minute()} ${utcDate.hour()} ${finalDate} ${finalMonth} ${dayOfWeek} ${utcDate.year()}`;

    return utcCronExpression;
};

export default convertCronExpressionToUTC;
