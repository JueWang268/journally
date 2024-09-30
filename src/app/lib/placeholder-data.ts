
const users = [
    {
      id: '410544b2-4001-4271-9855-fec4b6a6442a',
      name: 'User',
      email: 'user@nextmail.com',
      password: '123456',
    },
  ];
  
const journals = [
{
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    title: 'Personal Journal',
},
{
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    title: 'OOP Learning Journal',
},
{
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    title: 'Lee Robinson',
}
];

const entries = [
{
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    journal_id: journals[0].id,
    title: "new entry",
    content: 'pending',
    date: '2022-12-06',
},
{
    id: 'd6e15727-9fe1-5061-8c5b-ea44a9bd81aa',
    journal_id: journals[1].id,
    title: "new entry",
    content: 'pending',
    date: '2022-11-14',
},
{
    id: 'd6e15727-9fe1-5161-8c5b-ea44a9bd81aa',

    journal_id: journals[0].id,
    title: "new entry",
    content: 'paid',
    date: '2022-10-29',
},
{
    id: 'd6e15727-9fe1-5261-8c5b-ea44a9bd81aa',

    journal_id: journals[2].id,
    title: "new entry",
    content: 'paid',
    date: '2023-09-10',
},
{
    id: 'd6e15727-9fe1-5261-8c5b-ea44a9bd81aa',

    journal_id: journals[2].id,
    title: "new entry",
    content: 'pending',
    date: '2023-08-05',
},
{
    id: 'd6e15727-9fe1-5361-8c5b-ea44a9bd81aa',

    journal_id: journals[0].id,
    title: "new entry",
    content: 'pending',
    date: '2023-07-16',
},
{
    id: 'd6e15727-9fe1-5361-8c5b-ea44a9bd81aa',

    journal_id: journals[0].id,
    title: "new entry",
    content: 'pending',
    date: '2023-06-27',
},
{
    id: 'd6e15727-9fe1-5461-8c5b-ea44a9bd81aa',

    journal_id: journals[2].id,
    title: "new entry",
    content: 'paid',
    date: '2023-06-09',
},
{
    id: 'd6e15727-9fe1-5561-8c5b-ea44a9bd81aa',
    journal_id: journals[1].id,
    title: "new entry",
    content: 'paid',
    date: '2023-06-17',
},
];

const datapoints = [
{id: 291 , date: '2023-06-17', category: "run", value: 2000 },
{id: 292 , date: '2023-06-18', category: "run", value: 2090 },
{id: 294 , date: '2023-06-19', category: "run", value: 2643 },
{id: 299 , date: '2023-06-12', category: "run", value: 1455 },
];

export { users, journals, entries, datapoints };
  