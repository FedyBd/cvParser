import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { File } from '../../Entity/file.entity';

@Entity()
export class JobDescription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    jobTitle: string;

    @Column()
    jobDescription: string;

    @Column()
    requiredSkills: string;  // Comma-separated skills

    @Column('int')
    experienceRequiredInYears: number;  // Experience required in years

    @ManyToOne(() => User, user => user.jobDescriptions, { eager: true })
    owner: User;

    @Column()
    ownerId: number;

    @OneToMany(() => File, cv => cv.jobDescription, { cascade: true })
    cvs: File[];
}
