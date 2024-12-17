// src/cvdetails/cvdetails.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { File } from '../../Entity/file.entity';

@Entity()
export class CvDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    candidateName: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    numberOfMonthsExperience: number;

    @Column('text')
    experienceSection: string;

    @Column('text')
    educationSection: string;

    @Column('text')
    skillsSection: string;

    @Column('text')
    languagesSection: string;

    @OneToOne(() => File, candidate => candidate.cvDetails)
    @JoinColumn()
    candidate: File;
}
