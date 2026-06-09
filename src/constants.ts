import type { LineItem } from './types';

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
  { id: 'live-setup', label: 'Live Setup', notes: '3 camera, live mixing setup, 1 LED screen' },
  { id: 'fpv-drone', label: 'FPV Drone', notes: '' },
];

export const POST_PRODUCTION_ITEMS: ItemTemplate[] = [
  { id: 'insta-reels', label: 'Insta Reels (30\u201340 seconds)', notes: '' },
  { id: 'cinematic-teaser', label: 'Cinematic Teaser (50 seconds)', notes: '' },
  { id: 'cinematic-highlight', label: 'Cinematic Highlight (5\u20136 minutes)', notes: '' },
  { id: 'cinematic-short-film', label: 'Cinematic Short Film (15\u201320 minutes)', notes: '' },
  { id: 'traditional-film', label: 'Traditional Film (1\u20132 hours)', notes: '' },
  { id: 'edited-photos-master', label: 'Edited Photos (Master Data)', notes: '' },
  { id: 'edited-photos-collectives', label: 'Edited Photos (Collectives)', notes: '' },
  { id: 'same-day-highlight', label: 'Same Day Highlight (2\u20133 minutes)', notes: '' },
  { id: 'all-raw-data', label: 'All Raw Data Given', notes: '' },
];

export const BRAND = {
  businessName: 'Milan Photography',
  contactPerson: 'Milanbhai',
  mobile: '+91 8128126869',
  instagram: '@milanphotography',
  tagline: 'Wedding & Event Photography \u2014 Professional Quotation',
  colors: {
    primary: '#1f2937',
    accent: '#C9A94E',
    lightGold: '#F5EDD6',
    text: '#1a1a1a',
    muted: '#6b7280',
    white: '#ffffff',
  },
  logoPath: './logo.png',
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
