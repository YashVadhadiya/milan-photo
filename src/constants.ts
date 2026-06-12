import type { LineItem } from './types';
import backgroundPath from '../bg.png';

export const PRESET_TAGS = [
  'Jal',
  'Sagai',
  'Kanku Pagla',
  'Mandap',
  'Vana Rasam',
  'Haldi',
  'Sangeet',
  'Wedding',
  'Reception',
  'Birthday Party',
  'Family Function',
  'Baby Shower',
];

export interface ItemTemplate {
  id: string;
  label: string;
  notes: string;
}

export const PRE_PRODUCTION_ITEMS: ItemTemplate[] = [
  { id: 'cinematographer', label: 'Cinematographer', notes: '' },
  { id: 'candid-photographer', label: 'Candid Photographer', notes: '' },
  { id: 'ritual-photographer', label: 'Ritual Photographer', notes: '' },
  { id: 'ritual-videographer', label: 'Ritual Videographer', notes: '' },
  { id: 'drone', label: 'Drone', notes: '' },
  { id: 'live-setup', label: 'Live Setup', notes: '' },
  { id: 'fpv-drone', label: 'FPV Drone', notes: '' },
];

export const POST_PRODUCTION_ITEMS: ItemTemplate[] = [
  { id: 'insta-reels', label: 'Insta Reels', notes: '' },
  { id: 'cinematic-teaser', label: 'Cinematic Teaser', notes: '' },
  { id: 'cinematic-highlight', label: 'Cinematic Highlight', notes: '' },
  { id: 'cinematic-short-film', label: 'Cinematic Short Film', notes: '' },
  { id: 'traditional-film', label: 'Traditional Film', notes: '' },
  { id: 'edited-photos-master', label: 'Edited Photos Master Data', notes: '' },
  { id: 'edited-photos-collectives', label: 'Edited Photos Collectives', notes: '' },
  { id: 'same-day-highlight', label: 'Same Day Highlight', notes: '' },
  { id: 'all-raw-data', label: 'All Raw Data Given', notes: '' },
];

export const BRAND = {
  businessName: 'Milan Studio',
  contactPerson: 'Vishal Bhai',
  mobile: '+91 8128126869',
  tagline: 'Wedding & Event Photography',
  colors: {
    primary: '#263128',
    accent: '#B99A5B',
    olive: '#8A8B55',
    leaf: '#A3A469',
    lightGold: '#F7F1E3',
    paper: '#FBFAF7',
    text: '#232722',
    muted: '#6f7468',
    line: '#DED5BF',
    white: '#ffffff',
  },
  logoPath: './logo.png',
  backgroundPath,
};

export function createLineItem(template: ItemTemplate): LineItem {
  return {
    id: template.id,
    label: template.label,
    enabled: false,
    quantity: 1,
    notes: template.notes,
  };
}
