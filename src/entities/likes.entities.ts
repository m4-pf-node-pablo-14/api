import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    ManyToOne,
} from "typeorm";
import {User} from './user.entities.ts';
import {Posts} from './post.entities.ts';
@Entity("likes")
class Likes{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({type:"date"})
    createdat:string;
    
    @ManyToOne(() => User, (user) => user.likes)
    user: string;

    @ManyToOne(() => Posts, (posts) => posts.likes)
    posts: string;

}

export default Likes