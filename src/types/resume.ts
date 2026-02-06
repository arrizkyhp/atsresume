export interface SocialMedia {
  socialMedia: string;
  link: string;
}

export interface Education {
  school: string;
  degree: string;
  startYear: string;
  endYear: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  description: string;
  keyAchievements: string;
  startYear: string;
  endYear: string;
}

export interface Project {
  name: string;
  link: string;
  description: string;
  keyAchievements: string;
  startYear: string;
  endYear: string;
}

export interface SkillType {
  title: string;
  skills: string[];
}

export interface ResumeData {
  name: string;
  position: string;
  contactInformation: string;
  email: string;
  address: string;
  profilePicture: string;
  socialMedia: SocialMedia[];
  summary: string;
  education: Education[];
  workExperience: WorkExperience[];
  projects: Project[];
  skills: SkillType[];
  languages: string[];
  certifications: string[];
  tools: string[];
}

export interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  handleProfilePicture: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
