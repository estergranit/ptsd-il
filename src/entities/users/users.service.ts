import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User, UserRoles } from './user.entity.ts';
import type { CreateUserDto } from './dto/create-user.dto.ts';

export type SafeUser = User;

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

    return await this.usersRepo.save(
      this.usersRepo.create({
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone ?? null,
        roles: dto.roles ?? [UserRoles.VIEWER],
      }),
    );
  }

  public findAll(): Promise<SafeUser[]> {
    return this.usersRepo.find();
  }

  public async updateRoles(id: string, roles: UserRoles[]): Promise<SafeUser> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.roles = roles;
    return await this.usersRepo.save(user);
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
}
