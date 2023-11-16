import { useGetAssignmentsQuery } from "../../redux/reducers";

interface FormattedDataDatum {
  translatorName: string;
  isComplete: number;
  translatorNoShow: number;
  claimantNoShow: number;
  total: number;
  [key: string]: string | number;
}

export const useTranslatorNoShowToCompletionRatio = (sortBy: string) => {
  const { data, isError, isLoading } = useGetAssignmentsQuery({});

  const unParsedData: Record<string, FormattedDataDatum> = {};

  const unformattedData = data?.getAssignments.assignments || [];

  unformattedData.forEach((assignment) => {
    const translator = assignment.assignedTo;
    const isComplete = assignment.isComplete ? 1 : 0;
    const translatorNoShow = assignment.translatorNoShow ? 1 : 0;
    const claimantNoShow = assignment.claimantNoShow ? 1 : 0;

    if (translator) {
      const translatorName = `${translator.firstName} ${translator.lastName}`;

      if (!unParsedData[translatorName]) {
        unParsedData[translatorName] = {
          translatorName,
          isComplete,
          translatorNoShow,
          claimantNoShow,
          total: 1,
        };
      } else {
        unParsedData[translatorName].isComplete += isComplete;
        unParsedData[translatorName].translatorNoShow += translatorNoShow;
        unParsedData[translatorName].claimantNoShow += claimantNoShow;
        unParsedData[translatorName].total += 1;
      }
    }
  });

  const formattedData = Object.values(unParsedData)
    .sort((a, b) => {
      if (sortBy === "isComplete") {
        return b.isComplete - a.isComplete;
      } else if (sortBy === "translatorNoShow") {
        return b.translatorNoShow - a.translatorNoShow;
      } else if (sortBy === "claimantNoShow") {
        return b.claimantNoShow - a.claimantNoShow;
      } else {
        return b.total - a.total;
      }
    })
    .slice(0, 10);

  return {
    data: formattedData,
    isError,
    isLoading,
    isEmpty:
      data && data.getAssignments.assignments.length === 0 ? true : false,
  };
};
