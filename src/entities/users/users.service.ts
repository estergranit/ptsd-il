import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { User, UserRoles } from './user.entity.ts';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async create(
    email: string,
    password: string,
    roles: UserRoles[] = [UserRoles.VIEWER],
  ): Promise<User> {
    const exists = await this.findByEmail(email);
    if (exists) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(password, 10);
    return this.usersRepo.save(this.usersRepo.create({ email, password: hashed, roles }));
  }

  validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}
