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
  id: string;

  // Shared across all language versions of the same article
  @Column({ type: 'uuid', nullable: true })
  groupId: string | null;

  @Column()
  langId: string;

  @ManyToOne(() => Language, { onDelete: 'RESTRICT', eager: false })
  @JoinColumn({ name: 'langId' })
  lang: Language;

  @Column()
  header: string;

  @Column({ type: 'text', nullable: true })
  content: string | null;

  @Column({ nullable: true })
  authorId: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL', eager: false })
  @JoinColumn({ name: 'authorId' })
  author: User | null;

  @ManyToMany(() => Category)
  @JoinTable({ name: 'article_categories' })
  categories: Category[];

  @ManyToMany(() => Audience)
  @JoinTable({ name: 'article_audiences' })
  audiences: Audience[];

  @ManyToMany(() => AgeGroup)
  @JoinTable({ name: 'article_age_groups' })
  ageGroups: AgeGroup[];

  @Column({ default: 0 })
  sortOrder: number;

  @Column({ default: true })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
