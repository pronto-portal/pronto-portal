const getDateTimeDetailsFromCronExpression = (cronExpression: string) => {
    const parts = cronExpression.split(' ');
    const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

    const dayOfWeekString = dayOfWeek.split(',');
    const hourNumber = parseInt(hour, 10);
    return {
        minute: +minute,
        hour: hourNumber > 12 ? hourNumber - 12 : hourNumber,
        isPM: hourNumber >= 12,
        dayOfMonth: +dayOfMonth,
        month: +month,
        dayOfWeek: dayOfWeekString,
    };
};

export default getDateTimeDetailsFromCronExpression;
