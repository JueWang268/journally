import React, { useState, useEffect } from 'react';
import './Calendar.css';
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calendar = ({ selectedDate, onDateChange, height = 'auto', width = '100%', view="day"}) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        view={view}
        style = {{height, width}}
        value={selectedDate}
        onChange={(newSelectedDate) => {
          onDateChange(newSelectedDate);
        }}
        showDaysOutsideCurrentMonth
      />
    </LocalizationProvider>
  );
};

export default Calendar;