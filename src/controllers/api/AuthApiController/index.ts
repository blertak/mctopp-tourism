import { Request, Response, NextFunction } from 'express'
import UserService from '@services/UserService'

class AuthApiController {
  protected userService: UserService

  /**
   * @param {UserService} userService 
   */
  constructor(userService: UserService) {
    this.userService = userService;

    this.signup = this.signup.bind(this);
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = await this.userService.signup(req);
      res.statusCode = 200;
      return res.json(auth);
    } catch (err) {
      return next(err);
    }
  }
}

export default AuthApiController
