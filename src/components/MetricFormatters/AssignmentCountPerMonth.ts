import moment from 'moment';
import { useGetAssignmentsQuery } from '../../redux/reducers';

export const useAssignmentCountPerMonth = () => {
    const { data, isError, isLoading } = useGetAssignmentsQuery({});

    const reducedData =
        data &&
        data.getAssignments.assignments.reduce(
            (acc, assignment) => {
                const momentDate = moment(new Date(assignment.createdAt));
                const month = momentDate.month() + 1;
                const year = momentDate.year();
                const key = `${month}/${year}`;
                if (!acc[key]) {
                    acc[key] = 0;
                }
                acc[key] += 1;
                return acc;
            },
            {} as { [key: string]: number }
        );

    const formattedData =
        reducedData &&
        Object.keys(reducedData).map((key) => ({
            month: key,
            value: reducedData[key],
        }));

    return {
        data: formattedData,
        isError,
        isLoading,
        isEmpty: data && data.getAssignments.assignments.length === 0 ? true : false,
    };
};
