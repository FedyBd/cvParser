// offers-page.component.ts
import {User} from "./user.model";

export interface Offer {
  id: number;
  jobTitle: string;
  owner: User;
  requiredSkills: string;  // Add required skills
  experienceRequiredInYears: number;  // Add experience required in years
  jobDescription: string;
}
