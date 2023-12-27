import { useLanguages } from '../../contextProviders/LanguagesProvider';
import { useGetAssignmentsQuery } from '../../redux/reducers';

interface CirclePackChildDatum {
    id: string;
    count: number;
}

interface CirclePackParentDatum {
    id: string;
    children: CirclePackChildDatum[];
}

interface CirclePackRootDatum {
    id: string;
    children: CirclePackParentDatum[];
}

const useLanguagesPerAssignmentLocation = () => {
    const { data, isError, isLoading } = useGetAssignmentsQuery({});
    const { getLanguageFromCode } = useLanguages();

    const assignmentData = data?.getAssignments.assignments || [];

    const formattedData: CirclePackRootDatum = {
        id: 'Languages Per Assignment Location',
        children: [],
    };

    assignmentData.forEach((assignment) => {
        const city = assignment.address.city;
        const state = assignment.address.state;

        const location = `${city}, ${state}`;

        const language = getLanguageFromCode(assignment.claimant.primaryLanguage);
        const existingLocation = formattedData.children.find((d) => d.id === location);

        if (existingLocation) {
            const existingLanguage = existingLocation.children.find((d) => d.id === language);

            if (existingLanguage) {
                existingLanguage.count++;
            } else {
                existingLocation.children.push({
                    id: language,
                    count: 1,
                });
            }
        } else {
            formattedData.children.push({
                id: location,
                children: [
                    {
                        id: language,
                        count: 1,
                    },
                ],
            });
        }
    });

    return {
        data: formattedData,
        isError,
        isLoading,
        isEmpty: data && data.getAssignments.assignments.length === 0 ? true : false,
    };
};

export default useLanguagesPerAssignmentLocation;
