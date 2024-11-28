export interface Team {
  id: string;
  name: string;
  description: string;
  gameName: string;
  userUids: string[];
  photo?: string;
  code?: string;
}
