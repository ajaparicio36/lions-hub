export interface Post {
  id: string;
  content: string;
  createdAt: Date;
  authorId: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  date: Date;
  opponent: string;
}

export interface Tournament {
  id: string;
  name: string;
  placement: number;
  date: Date;
}
