export interface ClientDetails {
  name: string;
  mobile: string;
  address: string;
  eventDate: string;
  quotationDate: string;
}

export interface FooterDetails {
  owner1Name: string;
  owner1Mobile: string;
  owner1Enabled: boolean;
  owner2Name: string;
  owner2Mobile: string;
  owner2Enabled: boolean;
  address: string;
  mapLink: string;
  instagramId: string;
  instagramLink: string;
}

export interface LineItem {
  id: string;
  label: string;
  enabled: boolean;
  quantity: number;
  notes: string;
  days: number;
}

export interface EventDay {
  id: string;
  label: string;
  preProduction: LineItem[];
  postProduction: LineItem[];
}

export interface AppState {
  clientDetails: ClientDetails;
  footerDetails: FooterDetails;
  eventDays: EventDay[];
  totalAmount: number | null;
  advanceAmount: number | null;
}
