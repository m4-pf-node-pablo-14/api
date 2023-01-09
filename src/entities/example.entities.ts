import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('examples')
class Example {
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
}

export default Example;
