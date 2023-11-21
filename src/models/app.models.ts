export interface Ticket {
  id: string;
  identificationDoc: string;
  ticketTypeId: string;
  paymentTypeId: string;
  eventId: string;
  userId: string;
  attendance?: boolean;
  emailSended?: boolean;
  buyDate: FBDate;
  wasPay: boolean;
  vendorId?: string;
  scannerId?: string;
  name: string;
}

export interface Event {
  id: string;
  organizationId: string;
  eventTypeId: string;
  name: string;
  address?: string;
  date: FBDate;
  description?: string;
  logo?: string;
  images?: string[];
  contactInfo?: string;
  enabled: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  address?: string;
  roles: Roles[];
  phone?: string;
}

export interface TicketType {
  id: string;
  label: string;
  description?: string;
  price: number;
  eventId: string;
  symbol: string;
  maxAttendance?: number;
  ticketLimitPercentage?: number;
}

export interface FBDate {}

export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
  REGISTER = "REGISTER",
  SCANNER = "SCANNER",
}
