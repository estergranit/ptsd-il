import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Audience } from '../audiences/audiences.entity.ts';

@Entity('communities')
export class Community {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ nullable: true })
  location: string | null;

  @Column({ nullable: true })
  meetingType: string | null;

  @Column({ nullable: true })
  organization: string | null;

  @Column({ nullable: true })
  contactUrl: string | null;

  @ManyToMany(() => Audience)
  @JoinTable({ name: 'community_audiences' })
  targetAudiences: Audience[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
