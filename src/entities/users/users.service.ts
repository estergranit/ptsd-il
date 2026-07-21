import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { User, UserRoles } from './user.entity.ts';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  public findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  public async create(
    email: string,
    password: string,
    roles: UserRoles[] = [UserRoles.VIEWER],
  ): Promise<User> {
    const exists = await this.findByEmail(email);
    if (exists) {
      throw new ConflictException('Email already in use');
    }

    const hashed = await bcrypt.hash(password, 10);
    return await this.usersRepo.save(this.usersRepo.create({ email, password: hashed, roles }));
  }

  public validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}
