import * as express from 'express'
const router = express.Router()
import RouteBuilder = require("simple-express-route-builder")

import MainAPIController from '@controllers/api/MainApiController'
import TestService from '@services/TestService'
import TestRepository from '@repositories/Vendor/Mongo/TestRepository'
import AuthApiController from '@controllers/api/AuthApiController'
import UserRepository from '@repositories/Vendor/Mongo/UserRepository'
import UserService from '@services/UserService'

const register = () => {
  // CONTROLLERS
  const mainAPIController: MainAPIController = new MainAPIController(
    new TestService(new TestRepository)
  );
  const authApiController: AuthApiController = new AuthApiController(
    new UserService(new UserRepository)
  )

  const builder = new RouteBuilder('/api', router);

  builder.use((group, action) => action('GET', mainAPIController.index));
  builder.use((group, action) => action('POST', authApiController.signup));

  return router;
};

export default register;