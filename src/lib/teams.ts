export interface Team {
  id: string;
  teamName: string;
  description: string;
  gameName: string;
  userUids: string[];
  photo?: string;
  code?: string;
}
