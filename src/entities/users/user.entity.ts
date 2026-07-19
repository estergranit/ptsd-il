import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRoles {
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

  @Column({ unique: true, nullable: true })
  public email: string | null;

  @Column({ nullable: true })
  public phone: string | null;

  @Column()
  public password: string;

  @Column('text', { array: true, default: [] })
  public roles: UserRoles[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
