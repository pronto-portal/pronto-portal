import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface User extends DefaultSession['user'] {
    name: string;
    id: string;
    image?: string;
}

declare module 'next-auth' {
    interface Session {
        user: User;
        id_token: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id_token?: string;
    }
}
