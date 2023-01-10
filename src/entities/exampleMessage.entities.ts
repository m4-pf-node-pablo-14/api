import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ExampleUser from './exampleUser.entities';

@Entity('messages')
class ExampleMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text' })
  message: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @DeleteDateColumn()
  deleteAt: Date;
  @ManyToOne(() => ExampleUser, (user) => user.messages)
  user: ExampleUser;
}

export default ExampleMessage;
