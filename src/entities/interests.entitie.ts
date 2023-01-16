import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('interests')
class Interest {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 60 })
  name: string
}
