export interface Task {
    id: number;
    name: string;
    storyPoints: number;
    description: string;
    tags: string[];
    creatorName: string;
    assigneeName: string;
    status: string;
    priority: string;
  }