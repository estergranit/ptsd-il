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

export enum ArticleType {
  ARTICLE = 'article',
  FAQ = 'faq',
  TOOL = 'tool',
  TREATMENT_STEP = 'treatment_step',
  SOURCE = 'source',
  BOOK = 'book',
  VIDEO = 'video',
  ACTIVITY = 'activity',
  DOWNLOAD = 'download',
  STORY = 'story',
  APP = 'app',
}

export interface ArticleLink {
  label: string;
  url: string;
}

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  // Discriminator - kept as varchar (not a DB enum) so new types need no migration.
  @Column({ default: ArticleType.ARTICLE })
  public type: string;

  // Shared across all language versions of the same article
  @Column({ type: 'uuid', nullable: true })
  public groupId: string | null;

  @Column()
  public langId: string;

  @ManyToOne(() => { return Language }, { onDelete: 'RESTRICT', eager: false })
  @JoinColumn({ name: 'langId' })
  public lang: Language;

  @Column()
  public title: string;

  @Column({ type: 'text', nullable: true })
  public description: string | null;

  @Column({ type: 'text', nullable: true })
  public content: string | null;

  // External link for book/video/source/download/app types.
  @Column({ type: 'varchar', nullable: true })
  public url: string | null;

  // Bibliographic fields (source type). Distinct from authorId (the User FK below).
  @Column({ type: 'varchar', nullable: true })
  public authors: string | null;

  @Column({ type: 'varchar', nullable: true })
  public year: string | null;

  // Several labeled links (rights FAQ, treatment step). Not individually queryable by design.
  @Column({ type: 'jsonb', nullable: true })
  public links: ArticleLink[] | null;

  // Self-reference: a resource (book/app/...) can belong to a parent content item.
  @Column({ type: 'uuid', nullable: true })
  public parentId: string | null;

  @ManyToOne(() => { return Article }, { nullable: true, onDelete: 'CASCADE', eager: false })
  @JoinColumn({ name: 'parentId' })
  public parent: Article | null;

  @Column('uuid', { nullable: true })
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
