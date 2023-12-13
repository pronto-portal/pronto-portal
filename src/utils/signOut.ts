import Router from 'next/router';
import { axiosInstance } from './axiosInstances';
const signOut = async () => {
    const res = await axiosInstance.post('/signout').then((res) => {
        console.log('RESPONSE RECEIVED: ', res);
        Router.push('/login');
    });

    return res;
};

export default signOut;
