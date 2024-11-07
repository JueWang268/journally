# Journally

React, Next, Firebase, PostgresQL

## Goals



- [ ] User sign-in, cloud storage
    - [ ] Streak count
- [ ] multimedia
- [ ] automatic sorting of journal/entry bar
- [X] Rich text *formatting*: cf. Dayone
- [ ] Word count
- [ ] Sortable and searchable *tags* (Apple Journal’s limitations)
- [ ] *Search* by date, day, time…
- [X] Multiple journals (like Dayone Premium)
- [X] *Graphs* of (customizable) stats over time (e.g. weight, study time, etc)
    - [ ] Aggregate data for day, week, month...
- [ ] AI powered prompts (reminders) (cf other diary products)
- [ ] AI summary?


## Issues

- [X] Undefined behavior after deleting all journals (selectJournal state must not be null)
- [X] quill editor value should wait for `selectedEntry` content to finish updating
- [X] cannot make changes to writing pad. Every time a change is made to the textarea, the new content gets sent to the server.
Ther is a delay in server response, and the state of `selectedEntry` isn't updated in time to be reflected on the textarea.
- [ ] New Entry button should be grayed out, when `selectedJournal` is null
- [X] date on entry item changes to ISO string after changing the date

## TODO
 - The Entry Item makes a query call eveyr time the date is changed by a key
 - The Quill Editor still doesn't debounce because it is triggered every keystroke