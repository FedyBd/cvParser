export class CreateJobDescriptionDto {
    readonly jobTitle: string;
    readonly ownerId: number;
    readonly jobDescription: string;
    readonly requiredSkills: string;
    readonly experienceRequiredInYears: number;
}