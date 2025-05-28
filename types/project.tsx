export type Project = {
  id: string;
  projectName: string;
  projectType: string;
  startDate: string; // ou Date
  endDate: string;   // ou Date
  budget: number;
  location: string;
  description: string;
  objectives: string[];
  risks: string[];
  weatherAlerts: boolean;
  irrigationSystem: boolean;
  createdAt: string; // ou Date
  user: {
    name: string;
    phoneNumber: string;
  };
};

export type ProjectWithUser = {
  currentFunding: number;
  fundingGoal: ReactNode;
  progress: ReactNode;
  description: ReactNode;
  daysLeft: any;
  status: string;
  id: string;
  image?: string;
  projectName: string;
  user: {
    name: string;
    phoneNumber: string;
  } | null;
  location: string;
  budget: number;
  projectType: string;
};

export type ProjectData = {
  projectName: string;
  projectType: string;
  startDate: string; // ou Date
  endDate: string;   // ou Date
  budget: number;
  location: string;
  description: string;
  objectives: string[];
  risks: string[];
  weatherAlerts: boolean;
  irrigationSystem: boolean;
};
