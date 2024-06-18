import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RepositoryEntity } from "./repository.entity"; 

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
    
    @Column()
    avatar_url: string;

    @OneToMany(() => RepositoryEntity, repository => repository.user, { cascade: true })
    repositories: RepositoryEntity[];
}
