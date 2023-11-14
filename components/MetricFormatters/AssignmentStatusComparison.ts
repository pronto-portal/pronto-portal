import moment from "moment";
import { useGetAssignmentsQuery } from "../../redux/reducers";
import TimePeriodSelect from "../../types/timeperiodSelect";

interface FormattedDataType {
  Total: { [key: string]: number };
  Completed: { [key: string]: number };
  "Translator No Show": { [key: string]: number };
  "Claimant No Show": { [key: string]: number };
}

type FormattedDataTypeKey = keyof FormattedDataType;

export const useAssignmentStatusComparison = (timeRange: TimePeriodSelect) => {
  const { data, isError, isLoading } = useGetAssignmentsQuery({});

  const formattedData: FormattedDataType = {
    Total: {},
    Completed: {},
    "Translator No Show": {},
    "Claimant No Show": {},
  };

  data &&
    data.getAssignments.assignments.forEach((assignment) => {
      const momentDate = moment(new Date(assignment.createdAt));
      const date = momentDate.date() + 1;
      const month = momentDate.month() + 1;
      const year = momentDate.year();
      const week = momentDate.week();
      let key = `${month}/${year}`;

      if (timeRange === "1 Month" || timeRange === "3 Month")
        // key should be daily
        key = `${month}/${date}/${year}`;

      if (timeRange === "6 Month" || timeRange === "1 Year")
        // key should be weekly
        key = `${month}/${year} Week ${week}/52`;

      if (timeRange === "All")
        // key should be monthly
        key = `${month}/${year}`;

      if (!formattedData.Total[key]) {
        formattedData.Total[key] = 0;
      }

      if (!formattedData.Completed[key]) {
        formattedData.Completed[key] = 0;
      }

      if (!formattedData["Translator No Show"][key]) {
        formattedData["Translator No Show"][key] = 0;
      }

      if (!formattedData["Claimant No Show"][key]) {
        formattedData["Claimant No Show"][key] = 0;
      }

      formattedData.Total[key] += 1;

      if (assignment.isComplete) {
        formattedData.Completed[key] += 1;
      }

      if (assignment.translatorNoShow) {
        formattedData["Translator No Show"][key] += 1;
      }

      if (assignment.claimantNoShow) {
        formattedData["Claimant No Show"][key] += 1;
      }
    });

  const formattedDataKeys = Object.keys(
    formattedData
  ) as FormattedDataTypeKey[];

  const chartData = formattedDataKeys.map((key) => {
    const formattedDataKeys = Object.keys(formattedData[key]);

    return {
      id: key,
      data: formattedDataKeys.map((formattedDataKey) => ({
        x: formattedDataKey,
        y: formattedData[key][formattedDataKey],
      })),
    };
  });

  return {
    data: chartData,
    isError,
    isLoading,
  };
};
