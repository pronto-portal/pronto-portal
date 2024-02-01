import moment from 'moment';

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

    const finalMonth = month === '?' || month === '*' ? month : localDate.month() + 1;
    const finalDate = day === '?' || day === '*' ? day : localDate.date();

    const localDateCronExpression = `${localDate.minute()} ${localDate.hour()} ${finalDate} ${finalMonth} ${dayOfWeek} ${localDate.year()}`;

    return localDateCronExpression;
};

export default convertUTCCronExpressionToLocal;
