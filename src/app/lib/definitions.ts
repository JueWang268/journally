export type Tokens = {
  user_id: string;
  token: string;
  timestamp: Date;
};

export type Journals = {
  id: string;
  title: string;
  date: string;
  user_id: string;
};

export type Users = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Entries = {
  id: string;
  journal_id: string;
  title: string;
  content: string;
  date: string;
};

export type Datapoints = {
  id: string;
  user_id: string;
  name: string;
  value: number;
  date: string;
};

export type Datapoint = {
  id: string;
  date: string;
  value: number;
};

export type GroupedDatapoints = {
  name: string;
  data: Datapoint[];
};

export type Goal = {
  id: number;
  category: string;
  number: number;
  unit: string;
  frequency: number;
  modified_at: string;
};
