# Journally

React, Next, Firebase, PostgresQL

## Goals



- [ ] User sign-in, cloud storage
    - [ ] Streak count
- [ ] Rich text *formatting*: cf. Dayone
- [ ] Word count
- [ ] Sortable and searchable *tags* (Apple Journal’s limitations)
- [ ] *Search* by date, day, time…
- [X] Multiple journals (like Dayone Premium)
- [ ] *Graphs* of (customizable) stats over time (e.g. weight, study time, etc)
- [ ] AI powered prompts (reminders) (cf other diary products)
- [ ] AI summary?


## Issues

- [X] Undefined behavior after deleting all journals (selectJournal state must not be null)
- [ ] cannot make changes to writing pad. Every time a change is made to the textarea, the new content gets sent to the server.
Ther is a delay in server response, and the state of `selectedEntry` isn't updated in time to be reflected on the textarea.
- [ ] New Entry button should be grayed out, when `selectedJournal` is null
- [ ] date on entry item changes to ISO string after changing the date