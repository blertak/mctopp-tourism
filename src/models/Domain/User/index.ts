import * as Joi from 'joi';

import ModelBase from '@models/Domain/ModelBase';
import DbQuery from './schema';

class User extends ModelBase {
  public _id: string | null;
  public fullName: string | null;
  public email: string | null;
  public password: string | null;
  public tokenHash: string | null;

  constructor(params: {
    _id: string | null
    fullName: string | null
    email: string | null
    password: string | null
    tokenHash: string | null
  } | any) {
    super();
    this._id = params._id;
    this.fullName = params.fullName;
    this.email = params.email;
    this.password = params.password;
    this.tokenHash = params.tokenHash;

    this.rules = Joi.object().keys({
      _id: Joi.optional().allow(null),
      fullName: Joi.string().required().min(3),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      tokenHash: Joi.string().required(),
    });
  }

  asDTO() {
    const user = this.toJSON();
    user.password = null;
    user.tokenHash = null;
    user.passwordResetToken = null;
    user.passwordResetSentAt = null;
    return user;
  }

  static get DbQuery() {
    return DbQuery;
  }

}
export default User;
