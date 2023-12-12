import { getCookie } from 'cookies-next';

const setAuthHeaders = () => {
    const token = getCookie('x-access-token');
    if (token) {
        return { authorization: `Bearer ${token.toString()}` };
    }
    return {};
};

export default setAuthHeaders;
