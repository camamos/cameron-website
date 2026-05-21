export interface Show {
  id: string;
  date: string;
  city: string;
  venue: string;
  ticketLink: string;
  soldOut?: boolean;
}

export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  views: string;
  duration: string;
  link?: string;
}

export interface UserIntakeData {
  firstName: string;
  email: string;
  phone: string;
  city: string;
}

export interface JokeResponse {
  setup: string;
  punchline: string;
}