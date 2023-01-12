import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
class Address {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ type: 'text' })
    district: string;

  @Column({ type: 'text' })
    zipCode: string;

  @Column({ type: 'text' })
    number: string;

  @Column({ type: 'text' })
    city: string;

  @Column({ type: 'text' })
    state: string;
}

export default Address;
