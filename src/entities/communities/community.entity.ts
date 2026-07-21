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
  public id: string;

  @Column()
  public name: string;

  @Column({ type: 'text', nullable: true })
  public description: string | null;

  @Column('varchar', { nullable: true })
  public location: string | null;

  @Column('varchar', { nullable: true })
  public meetingType: string | null;

  @Column('varchar', { nullable: true })
  public organization: string | null;

  @Column('varchar', { nullable: true })
  public contactUrl: string | null;

  @ManyToMany(() => { return Audience })
  @JoinTable({ name: 'community_audiences' })
  public targetAudiences: Audience[];

  @Column({ default: true })
  public isActive: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
