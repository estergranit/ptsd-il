import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User, UserRoles } from './user.entity.ts';
import type { CreateUserDto } from './dto/create-user.dto.ts';

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

  public async createUser(dto: CreateUserDto): Promise<SafeUser> {
    const exists = await this.findByEmail(dto.email);
    if (exists) {
      throw new ConflictException('Email already in use');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const saved = await this.usersRepo.save(
      this.usersRepo.create({
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone ?? null,
        password: hashed,
        roles: dto.roles ?? [UserRoles.VIEWER],
      }),
    );
    const { password: _password, ...safe } = saved;
    return safe;
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

  public findById(id: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

  public async setPassword(id: string, plainPassword: string): Promise<{ message: string }> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password = await bcrypt.hash(plainPassword, 10);
    await this.usersRepo.save(user);
    return { message: 'Password updated' };
  }
}
