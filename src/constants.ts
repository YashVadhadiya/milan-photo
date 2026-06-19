import type { FooterDetails, LineItem } from './types';
import backgroundPath from '../bg.png';

export const PRESET_TAGS = [
  'Jal',
  'Sagai',
  'Kanku Pagla',
  'Sagai + Kanku Pagla',
  'Pre Wedding',
  'Lagan Lekhan',
  'Mandap',
  'Vana Rasam',
  'Dandiya',
  'Mandap + Dandiya',
  'Wedding Day',
  'Reception',
  'Birthday Party',
  'Family Function',
  'Baby Shower',
  'Baby Photography',
  'Panchmasi',
  'Plazma Screen',
];

export interface ItemTemplate {
  id: string;
  label: string;
  notes: string;
}

export const PRE_PRODUCTION_ITEMS: ItemTemplate[] = [
  { id: 'cinematographer', label: 'Cinematographer', notes: '' },
  { id: 'semi-cinematographer', label: 'Semi Cinematographer', notes: '' },
  { id: 'candid-photographer', label: 'Candid Photographer', notes: '' },
  { id: 'traditional-photographer', label: 'Traditional Photographer', notes: '' },
  { id: 'traditional-videographer', label: 'Traditional Videographer', notes: '' },
  { id: 'family-photographer', label: 'Family Photographer', notes: '' },
  { id: 'drone', label: 'Drone', notes: '' },
  { id: 'live-setup', label: 'Live Setup', notes: '' },
  { id: 'plazam-tv', label: 'Plazam TV', notes: '' },
  { id: 'fpv-drone', label: 'FPV Drone', notes: '' },
];

export const POST_PRODUCTION_ITEMS: ItemTemplate[] = [
  { id: 'reels', label: 'Reels', notes: '' },
  { id: 'cinematic-teaser', label: 'Cinematic Teaser', notes: '' },
  { id: 'cinematic-highlight', label: 'Cinematic Highlight', notes: '' },
  { id: 'cinematic-short-film', label: 'Cinematic Short Film', notes: '' },
  { id: 'traditional-film', label: 'Traditional Film', notes: '' },
  { id: 'edited-photos-story', label: 'Edited Photos Story', notes: '' },
  { id: 'same-day-highlight', label: 'Same Day Highlight', notes: '' },
  { id: 'all-photos-full-videos', label: 'All Photos & Full Videos', notes: '' },
  { id: 'all-raw-data', label: 'All Raw Data', notes: '' },
  { id: 'pre-wed-teaser', label: 'Pre Wed. Teaser + Couple Song', notes: '' },
];

export const BRAND = {
  businessName: 'Milan Photo',
  contactPerson: 'Vishal Bhai',
  mobile: '+91 8128126869',
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

export const DEFAULT_FOOTER: FooterDetails = {
  owner1Name: 'Vishal Bhai',
  owner1Mobile: '+91 8128126869',
  owner1Enabled: true,
  owner2Name: 'Dharmik Bhai',
  owner2Mobile: '+91 8469507585',
  owner2Enabled: true,
  address: 'MILAN PHOTO, 509, 5th Floor, Asopalav Cross Road Building, Opp. Shastrinagar Main Gate, Nana Mava Main Road, Rajkot.',
  mapLink: 'https://maps.app.goo.gl/PwMjjfJf7mLP7cKn6',
  instagramId: 'milan_photoshoot__',
  instagramLink: 'https://www.instagram.com/milan_photoshoot__',
};

export function createLineItem(template: ItemTemplate): LineItem {
  return {
    id: template.id,
    label: template.label,
    enabled: false,
    quantity: 1,
    notes: template.notes,
    days: 0,
  };
}
