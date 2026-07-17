import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('age_groups')
export class AgeGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'int' })
  min: number;

  @Column({ type: 'int' })
  max: number;
}
