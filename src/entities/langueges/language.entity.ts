import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('languages')
export class Language {
  @PrimaryColumn()
  id: string; // ISO code: he, ar, ru, en, fr

  @Column()
  name: string;

  @Column({ default: 'ltr' })
  direction: string;

  @Column({ default: true })
  isActive: boolean;
}
