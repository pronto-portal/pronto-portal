import moment from 'moment';

const adjustDayOfWeekForLocal = (dayOfWeek: string, originalDate: Date, localDate: Date) => {
    if (dayOfWeek === '*' || dayOfWeek === '?') {
        return dayOfWeek;
    }

    const dayDifference = localDate.getDate() - originalDate.getUTCDate();
    const days = dayOfWeek.split(',').map(Number);

    const adjustedDays = days.map((day) => {
        let newDay = day - dayDifference;

        newDay = newDay > 7 ? newDay - 7 : newDay < 1 ? newDay + 7 : newDay;
        return newDay;
    });

    return adjustedDays.join(',');
};

const convertUTCCronExpressionToLocal = (cronExpression: string): string => {
    const cronArray = cronExpression.split(' ');
    const minute = cronArray[0];
    const hour = cronArray[1];
    const day = cronArray[2];
    const month = cronArray[3];
    const dayOfWeek = cronArray[4];
    const year = isNaN(+cronArray[5]) ? new Date().getFullYear() : cronArray[5];

    const tempDay = day === '?' || day === '*' ? 15 : parseInt(day);
    const tempMonth = month === '?' || month === '*' ? 6 : parseInt(month);

    const isoString = `${year}-${tempMonth < 10 ? `0${tempMonth}` : tempMonth}-${tempDay < 10 ? `0${tempDay}` : tempDay}T${+hour < 10 ? `0${hour}` : hour}:${
        +minute < 10 ? `0${minute}` : minute
    }:00`;

    const utcDate = new Date(isoString);

    const localDate = moment(utcDate).local();
    const finalDayOfWeek = adjustDayOfWeekForLocal(dayOfWeek, utcDate, localDate.toDate());

    const finalMonth = month === '?' || month === '*' ? month : localDate.month() + 1;
    const finalDate = day === '?' || day === '*' ? day : localDate.date();

    const localDateCronExpression = `${localDate.minute()} ${localDate.hour()} ${finalDate} ${finalMonth} ${finalDayOfWeek} ${localDate.year()}`;

    return localDateCronExpression;
};

export default convertUTCCronExpressionToLocal;
