import User from '@models/Domain/User'

  interface IUserRepository {
    create(model: User): Promise<User>

    count(conditions?: any): Promise<number>
  }

  export default IUserRepository
  