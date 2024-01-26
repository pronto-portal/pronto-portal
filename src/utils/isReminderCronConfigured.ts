// function that checks a reminder cron to see if it is configured by the user
// this function breaks apart the cron string and checks to see if the month and year are the same as the assignment date,
// and if the day is the day before the assignment date. If so, then the cron is not configured and the function returns false.
const isReminderCronConfigured = (cron?: string, assignmentDate?: Date): boolean => {
    if (!cron || !assignmentDate) return false;

    const cronArray = cron.split(' ');
    const cronYear = cronArray[6];
    const cronMonth = cronArray[4];
    const cronDay = cronArray[3];
    const assignmentYear = assignmentDate.getFullYear().toString();
    const assignmentMonth = assignmentDate.getMonth().toString();
    const assignmentDay = assignmentDate.getDate().toString();
    if ((cronYear === assignmentYear && cronMonth === assignmentMonth && cronDay === assignmentDay) || cron.trim() === '') {
        return false;
    }
    return true;
};

export default isReminderCronConfigured;
