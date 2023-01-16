import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('interests')
class Interest {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ length: 60 })
    name: string;
}

export default Interest;
