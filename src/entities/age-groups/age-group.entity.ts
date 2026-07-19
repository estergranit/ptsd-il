import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('age_groups')
export class AgeGroup {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({ type: 'text', nullable: true })
  public description: string | null;

  @Column({ type: 'int' })
  public min: number;

  @Column({ type: 'int' })
  public max: number;
}
