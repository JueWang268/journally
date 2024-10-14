export type Journals = {
    id: string;
    title: string;
    date: string;
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
    date: Date;
};