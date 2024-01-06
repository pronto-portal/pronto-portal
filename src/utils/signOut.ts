import Router from 'next/router';
import { axiosInstanceCustomUrl } from './axiosInstances';
const signOut = async () => {
    const res = await axiosInstanceCustomUrl
        .get(`${process.env.NODE_ENV === 'production' ? 'https://prontotranslationservices.com' : 'http://localhost:3000'}/api/auth/signOut`)
        .then(() => {
            Router.push('/login');
        });

    return res;
};

export default signOut;
