import React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { Box, Typography } from "@mui/material";

const WeekCalendar = ({ chosenDate, onDateChange, height = "100%", width = "100%" }) => {
  const startOfWeek = chosenDate.startOf("week");

  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box style={{ height, width, textAlign: "center" }}>

        {/* Render the calendar */}
        <DateCalendar
          style={{ height: "100%", width: "100%" }}
          value={chosenDate}
          onChange={onDateChange}
          views={["day"]}
          slots={{
            day: (props) => {
              const { day } = props;
              return weekDays.some((d) => d.isSame(day, "day")) ? (
                <PickersDay {...props} />
              ) : null;
            },
            calendarHeader: () => null, // Hides the month-year header
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default WeekCalendar;
