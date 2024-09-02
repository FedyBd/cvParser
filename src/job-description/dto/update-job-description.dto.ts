import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateJobDescriptionDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    jobTitle?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    jobDescription?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    requiredSkills?: string;

    @IsOptional()
    @IsNumber()
    experienceRequiredInYears?: number;
}
