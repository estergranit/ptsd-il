import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRoles {
  MASTERADMIN = 'masteradmin',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  VIEWER = 'viewer',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column('varchar', { unique: true, nullable: true })
  public email: string | null;

  @Column('varchar', { nullable: true })
  public phone: string | null;

  @Column('text', { array: true, default: [] })
  public roles: UserRoles[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
