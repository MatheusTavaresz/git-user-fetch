import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class RepositoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string

    @Column({nullable: true})
    description: string;

    @Column({nullable: true})
    url: string;

    @Column({ nullable: true, type: 'timestamp' })
    createdAt: Date;

    @Column({nullable: true})
    language: string;

    @ManyToOne(() => UserEntity, user => user.repositories)
    user: UserEntity;
}
