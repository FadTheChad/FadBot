export default interface IUser {
    _id: string,
    blacklisted: boolean
}

export interface IUserCache {
    blacklisted?: boolean
}