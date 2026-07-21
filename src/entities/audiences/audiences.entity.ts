import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('audiences')
export class Audience {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public slug: string;

  @Column()
  public name: string;

  @Column({ type: 'text', nullable: true })
  public description: string | null;
}
