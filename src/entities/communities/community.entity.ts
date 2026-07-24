import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Audience } from '../audiences/audiences.entity.ts';
import { Language } from '../langueges/language.entity.ts';

@Entity('communities')
export class Community {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  // Shared across all language versions of the same community.
  @Column({ type: 'uuid', nullable: true })
  public groupId: string | null;

  @Column()
  public langId: string;

  @ManyToOne(() => { return Language }, { onDelete: 'RESTRICT', eager: false })
  @JoinColumn({ name: 'langId' })
  public lang: Language;

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
