import React, { useState, useEffect } from 'react';
import './Calendar.css';
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calendar = ({ selectedDate, onDateChange }) => {



  return (
    <div className="card">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <span>{dayjs(selectedDate).format("MMMM D, YYYY")}</span>
        <DateCalendar
          value={selectedDate}
          onChange={(newSelectedDate) => {
            onDateChange(newSelectedDate);
          }} />
      </LocalizationProvider>

    </div>
  );
};

export default Calendar;