// src/file/file.entity.ts
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne} from 'typeorm';
import {JobDescription} from "../job-description/entities/job-description.entity";
import {CvDetails} from "../cvdetails/entities/cvdetail.entity";
import {User} from "../users/entities/user.entity";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @Column()
    originalName: string;

    @Column()
    path: string;

    @ManyToOne(() => JobDescription, jobDescription => jobDescription.cvs)
    jobDescription: JobDescription;
    @Column()
    jobDescriptionId:number;

    @ManyToOne(() => User, user => user.cvs)
    user: User;
    @Column()
    userId:number;

    @OneToOne(() => CvDetails, cvDetails => cvDetails.candidate)
    cvDetails: CvDetails;

    @Column()
    Rate:number

    @Column()
    ExpRate:number

    @Column()
    SkillsRate:number
}

