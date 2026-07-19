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
import { User } from '../users/user.entity.ts';
import { AgeGroup } from '../age-groups/age-group.entity.ts';
import { Audience } from '../audiences/audiences.entity.ts';
import { Category } from '../categories/category.entity.ts';
import { Language } from '../langueges/language.entity.ts';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  // Shared across all language versions of the same article
  @Column({ type: 'uuid', nullable: true })
  public groupId: string | null;

  @Column()
  public langId: string;

  @ManyToOne(() => { return Language }, { onDelete: 'RESTRICT', eager: false })
  @JoinColumn({ name: 'langId' })
  public lang: Language;

  @Column()
  public header: string;

  @Column({ type: 'text', nullable: true })
  public content: string | null;

  @Column({ nullable: true })
  public authorId: string | null;

  @ManyToOne(() => { return User }, { nullable: true, onDelete: 'SET NULL', eager: false })
  @JoinColumn({ name: 'authorId' })
  public author: User | null;

  @ManyToMany(() => { return Category })
  @JoinTable({ name: 'article_categories' })
  public categories: Category[];

  @ManyToMany(() => { return Audience })
  @JoinTable({ name: 'article_audiences' })
  public audiences: Audience[];

  @ManyToMany(() => {return AgeGroup })
  @JoinTable({ name: 'article_age_groups' })
  public ageGroups: AgeGroup[];

  @Column({ default: 0 })
  public sortOrder: number;

  @Column({ default: true })
  public isPublished: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
