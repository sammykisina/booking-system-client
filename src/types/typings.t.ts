import type { ReactNode } from 'react';

export interface UserData {
  email: string;
  password: string;
}

export interface RegisterData extends UserData {
  name: string;
}

export type User = {
  id: number;
  email: string;
  role: string;
  name: string;
};

export type Ticket = {
  id: number;
  attributes: {
    ticketNumber: string;
    journey: string;
    price: number;
    means: string;
    createdAt: string;
  };
};

export type Client = {
  id: number;
  attributes: {
    name: string;
    email: string;
    joinedAt: string;
  };
  relationships: {
    tickets: Ticket[];
  };
};

export type Journey = {
  id: number;
  attributes: {
    departure: string;
    destination: string;
    dayOfWeek: string;
    price: number;
    journeyTime: string;
    startTime: string;
  };
};

export type Route = {
  inactiveIcon?: ReactNode;
  activeIcon?: ReactNode;
  name?: string;
  to: string;
};

export type SelectionOption = {
  name: string;
  value: string;
  price?: number;
  journeyTime?: string;
};

export type TicketsData = {
  journey: string;
  price: number;
  user_id: number;
  numberOfTotalTickets: number;
  means: string;
};

type ObjKeyof<T> = T extends object ? keyof T : never;
type KeyofKeyof<T> = ObjKeyof<T> | { [K in keyof T]: ObjKeyof<T[K]> }[keyof T];
type StripNever<T> = Pick<
  T,
  { [K in keyof T]: [T[K]] extends [never] ? never : K }[keyof T]
>;
type Lookup<T, K> = T extends any ? (K extends keyof T ? T[K] : never) : never;

export type SimpleFlatten<T> = T extends object
  ? StripNever<{
      [K in KeyofKeyof<T>]:
        | Exclude<K extends keyof T ? T[K] : never, object>
        | { [P in keyof T]: Lookup<T[P], K> }[keyof T];
    }>
  : T;

export type NestedFlatten<T> = SimpleFlatten<
  SimpleFlatten<SimpleFlatten<SimpleFlatten<SimpleFlatten<T>>>>
>;
