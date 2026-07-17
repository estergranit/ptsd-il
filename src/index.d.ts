import { UserRoles } from './entities/users/user.entity';

declare global {
  namespace Express {
    interface Request {
      context: {
        id: string;
        email: string;
        roles: UserRoles[];
      };
    }
  }
}
