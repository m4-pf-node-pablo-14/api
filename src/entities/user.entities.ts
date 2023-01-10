import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 60 })
  name: string

  @Column({ length: 60 })
  last_name: string

  @Column({ length: 60 })
  password: string

  @Column({ length: 60, unique: true })
  email: string

  @Column({ length: 60, unique: true })
  username: string

  @Column({ length: 200 })
  bio: string

  @Column()
  interest_one: string

  @Column()
  interest_two: string
}

function Entity(arg0: string) {
  throw new Error("Function not implemented.")
}


function PrimaryGeneratedColumn(arg0: string) {
  throw new Error("Function not implemented.")
}


function Column(arg0: { length: number }) {
  throw new Error("Function not implemented.")
}
