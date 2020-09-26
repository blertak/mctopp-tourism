import IUserRepository from '@repositories/Interfaces/IUserRepository'
import  User  from '@models/Domain/User/index'
import { Types } from 'mongoose';

export default class UserRepository implements IUserRepository {

  parseRecord(raw: any) {
    return new User({
      _id: raw._id || null, fullName: raw.username || null, email: raw.email || null,
      password: raw.password || null, tokenHash: raw.tokenHash || null,
    });
  }

  async create(model: User) {
    const res = await User.DbQuery.create(model.toJSON());
    return this.parseRecord(res);
  }

  async count(conditions = null) {
    return await User.DbQuery.count(conditions || {});
  }
}
