import { getRounds, hashSync } from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ExampleMessage from './exampleMessage.entities';

@Entity('users')
class ExampleUser {
  @PrimaryGeneratedColumn('uuid')
    id: string;
  @Column({ type: 'text', unique: true })
    email: string;
  @Column({ type: 'text' })
    password: string;
  @OneToMany(() => ExampleMessage, (message) => message.user)
    messages: ExampleMessage[];
  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    const numberRounds = getRounds(this.password);
    if (!numberRounds) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export default ExampleUser;
