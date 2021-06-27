import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserDetail {
  @PrimaryColumn({ nullable: false })
  id: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  pin: string;

  @OneToOne(() => User, (user) => user.id) // specify inverse side as a second parameter
  user: User;
}
