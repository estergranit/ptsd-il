import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User, UserRoles } from './user.entity.ts';

export type SafeUser = Omit<User, 'password'>;

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

  public findAll(): Promise<SafeUser[]> {
    return this.usersRepo.find({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        roles: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  public async updateRoles(id: string, roles: UserRoles[]): Promise<SafeUser> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.roles = roles;
    const saved = await this.usersRepo.save(user);
    const { password: _password, ...safe } = saved;
    return safe;
  }

  public async remove(id: string): Promise<void> {
    const result = await this.usersRepo.delete(id);
    if (!result.affected) {
      throw new NotFoundException('User not found');
    }
  }
}
