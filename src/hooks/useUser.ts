import { useGetUserQuery } from '../redux/reducers';

const useUser = () => {
    const { data, isLoading, isError, refetch } = useGetUserQuery({});

    const role = data && data.getUser ? data.getUser.role : undefined;
    const translatorsCount = data && data.getUser ? data.getUser.translatorsCount : 0;
    const remindersCount = data && data.getUser ? data.getUser.remindersCount : 0;
    const roleName = data && data.getUser ? data.getUser.role.name : '';

    const monthlyPrice = data && data.getUser ? data.getUser.role.priceCents / 100 : '';

    const translatorsLimit = role ? role.translatorsLimit : 0;
    const remindersLimit = role ? role.remindersLimit : 0;

    const remainingTranslators = translatorsLimit - translatorsCount;
    const remainingReminders = remindersLimit - remindersCount;

    return {
        user: data ? data.getUser : undefined,
        roleName,
        monthlyPrice,
        translatorsCount,
        remindersCount,
        translatorsLimit,
        remindersLimit,
        remainingTranslators,
        remainingReminders,
        role,
        isLoading,
        isError,
        refetch,
    };
};

export default useUser;
