export interface ClientDetails {
  name: string;
  mobile: string;
  address: string;
  eventName: string;
  venue: string;
}

export interface LineItem {
  id: string;
  label: string;
  enabled: boolean;
  quantity: number;
  notes: string;
}

export interface EventDay {
  id: string;
  label: string;
  preProduction: LineItem[];
  postProduction: LineItem[];
}

export interface AppState {
  clientDetails: ClientDetails;
  eventDays: EventDay[];
  totalAmount: number | null;
}
