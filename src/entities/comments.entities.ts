import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 160})
    text: string;

    @ManyToOne(() => Post)
    post: Post

    @ManyToOne(() => User)
    user: User
}