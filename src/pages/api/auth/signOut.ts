import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
// Make sure that we don't parse JSON bodies on this route:
export const config = {
    api: {
        bodyParser: false,
    },
};

const Signout = (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise<void>((resolve, reject) => {
        return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signout`).then((response) => {
            const { data } = response;
            const expiresInDateUnixTime = new Date('1970-01-01').toUTCString();

            if (data) {
                res.setHeader(
                    'set-cookie',
                    `x-access-token=; path=/; secure; httponly; samesite=none; expires=${expiresInDateUnixTime}; domain=${
                        process.env.NODE_ENV === 'production' ? '.prontotranslationservices.com' : 'localhost'
                    };`
                );
                res.status(200).json({ message: 'Successfully signed out' });
                resolve();
            } else {
                res.status(400).json({ message: 'Something went wrong' });
                reject();
            }
        });
    });
};

export default Signout;
