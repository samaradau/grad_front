export interface IUser {
    id: string;
    userName: string;
    userSurname: string;
    userEmail: string;
    token: string;
    roles: Array<string>;
}
