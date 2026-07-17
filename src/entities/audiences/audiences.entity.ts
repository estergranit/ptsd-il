import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('audiences')
export class Audience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;
}
