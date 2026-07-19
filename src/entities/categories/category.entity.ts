import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public slug: string;

  @Column({ nullable: true })
  public parentId: string | null;

  @ManyToOne(() => { return Category }, (cat) => { return cat.children }, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parentId' })
  public parent: Category | null;

  @OneToMany(() => { return Category }, (cat) => { return cat.parent })
  public children: Category[];

  @Column()
  public name: string;

  @Column({ default: 0 })
  public sortOrder: number;

  @Column({ default: true })
  public isActive: boolean;
}
