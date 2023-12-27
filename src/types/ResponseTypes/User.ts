import { User } from '../ObjectTypes';

export interface UpdateUserResponse {
    updateUser: User;
}

export interface GetUserResponse {
    getUser: User;
}
// todo: differentiate between user an translator in api within user table
// if a user has authenticated with google, then other users should not be
// able to update their fields
