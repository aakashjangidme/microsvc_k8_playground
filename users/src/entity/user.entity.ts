import { ROLES } from '../config/constants';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ nullable: false })
  id: string;

  @Column({ nullable: true })
  displayName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  photoURL: string;

  @Column('int', { nullable: false, default: ROLES.user })
  role: Number;

  // @OneToOne((type) => UserDetail)
  // @JoinColumn()
  // details: UserDetail;
}
