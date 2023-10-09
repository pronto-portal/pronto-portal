import moment from "moment";

export const dateToString = (date: Date | string): string => {
  const momentDate = moment(date).local();

  return momentDate.format("MM/DD/YYYY hh:mm a");
};
