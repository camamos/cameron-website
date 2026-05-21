import { Show, Video } from './types';

export const UPCOMING_SHOWS: Show[] = [
  {
    id: '1',
    date: '2024-10-15',
    city: 'New York, NY',
    venue: 'The Comedy Cellar',
    ticketLink: '#',
    soldOut: true,
  },
  {
    id: '2',
    date: '2024-10-22',
    city: 'Austin, TX',
    venue: 'The Mothership',
    ticketLink: '#',
  },
  {
    id: '3',
    date: '2024-11-05',
    city: 'Los Angeles, CA',
    venue: 'The Comedy Store',
    ticketLink: '#',
  },
  {
    id: '4',
    date: '2024-11-12',
    city: 'Chicago, IL',
    venue: 'Zanies',
    ticketLink: '#',
  },
];

export const STANDUP_VIDEOS: Video[] = [
  {
    id: 'v1',
    title: 'Surviving Modern Dating',
    thumbnailUrl: 'https://picsum.photos/seed/comedy1/600/400',
    views: '1.2M',
    duration: '12:45',
    link: '#'
  },
  {
    id: 'v2',
    title: 'Why I Hate Airports',
    thumbnailUrl: 'https://picsum.photos/seed/comedy2/600/400',
    views: '850K',
    duration: '08:30',
    link: '#'
  },
  {
    id: 'v3',
    title: 'Crowd Work Gone Wrong',
    thumbnailUrl: 'https://picsum.photos/seed/comedy3/600/400',
    views: '2.1M',
    duration: '15:10',
    link: '#'
  },
];

export const SKIT_VIDEOS: Video[] = [
  {
    id: 's1',
    title: "Flying America's WORST Airline (COMEDY)",
    thumbnailUrl: 'https://img.youtube.com/vi/x8D-e1IhHIY/maxresdefault.jpg',
    views: 'YouTube',
    duration: 'SKETCH',
    link: 'https://youtu.be/x8D-e1IhHIY?si=FWI_O2vhZhrH_dXS'
  },
  {
    id: 's2',
    title: "When a YN Graduates",
    thumbnailUrl: 'https://img.youtube.com/vi/Gch6xIukMuM/maxresdefault.jpg',
    views: 'YouTube',
    duration: 'SHORT',
    link: 'https://youtube.com/shorts/Gch6xIukMuM'
  },
  {
    id: 's3',
    title: "How Food Delivery Drivers Be",
    thumbnailUrl: 'https://img.youtube.com/vi/v1pf8g4EESM/maxresdefault.jpg',
    views: 'YouTube',
    duration: 'SHORT',
    link: 'https://youtube.com/shorts/v1pf8g4EESM?si=22nr5sTk6VXtTJXx'
  }
];