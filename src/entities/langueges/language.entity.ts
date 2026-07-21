import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('languages')
export class Language {
  @PrimaryColumn()
  public id: string; // ISO code: he, ar, ru, en, fr

  @Column()
  public name: string;

  @Column({ default: 'ltr' })
  public direction: string;

  @Column({ default: true })
  public isActive: boolean;
}
