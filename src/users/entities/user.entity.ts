import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {JobDescription} from "../../job-description/entities/job-description.entity";
import {File} from "../../Entity/file.entity";


export enum UserType {
    recruiter = 'recruiter',
    candidate = 'candidate',
}


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: UserType,
    })
    usertype: UserType;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    // Add the one-to-many relationship with JobDescription
    @OneToMany(() => JobDescription, jobDescription => jobDescription.owner)
    jobDescriptions: JobDescription[];

    @OneToMany(() => File, cv => cv.jobDescription)
    cvs: File[];
}
