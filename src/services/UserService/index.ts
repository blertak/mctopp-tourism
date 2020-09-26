import IUserRepository from '@repositories/Interfaces/IUserRepository'
import { Request } from 'express'
import SecurityHelper from '@helpers/SecurityHelper'
import UserDefinedError from '@models/Business/Error/UserDefinedError'
import  User  from '@models/Domain/User'
import config from '@config'

class UserService {
  public iuserRepository: IUserRepository;

  constructor(iuserRepository: IUserRepository) {
    this.iuserRepository = iuserRepository;
  }

  authResponse(user: User) {
    const token = SecurityHelper.encryptJwtToken(user._id as string, user.tokenHash as string);

    return {
      token,
      userId: user._id as string,
      expires: config.JWT_EXPIRE_TIME
    };
  }

  async signup(req: Request) {
    const fullName = req.body.fullName ? req.body.fullName.toLowerCase() : null;
    const email = req.body.email ? req.body.email.toLowerCase() : null;
    const password = req.body.password ? req.body.password : null;
    const confirmPassword = req.body.confirmPassword || null;

    const passwordError = SecurityHelper.checkPasswordPolicy(password);
    if (passwordError)
      throw new UserDefinedError(passwordError, 422);

      const count = await this.iuserRepository.count( email );

      // if (count > 0)
      //   throw new UserDefinedError("This email is already in use.", 409);

        if (password !== confirmPassword)
        throw new UserDefinedError("Password and confirmed password mismatch", 422);

        const pass = await SecurityHelper.hashPassword(password);
        const model = new User({
          fullName: fullName,
          email: email,
          password: pass.password,
          tokenHash: pass.tokenHash,
        });
        
        const user = await this.iuserRepository.create(
          new User({
            fullName: fullName,
            email: email,
            password: pass.password,
            tokenHash: pass.tokenHash,
          }));
        return this.authResponse(user);
  }
}

export default UserService
