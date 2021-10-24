import { Model, model, Schema } from 'mongoose'
import IUser from '../structure/interfaces/db/IUser'

const UserSchema = new Schema({
    _id: { type: String },
    blacklisted: { type: Boolean, default: false }
})

const UserModel: Model<IUser> = model('user-settings', UserSchema)

export default UserModel