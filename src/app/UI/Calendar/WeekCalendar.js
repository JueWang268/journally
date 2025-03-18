import React, { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { IconButton } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowRightIcon from "@mui/icons-material/ChevronRight";

const WeekCalendar = ({chosenDate=dayjs(), onDateChange, height = "100%", width = "100%" }) => {
  const [selectedDate, setSelectedDate] = useState(chosenDate);

  // Calculate start of the currently selected week (Sunday)
  const startOfWeek = selectedDate.startOf("week");

  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.add(i, "day")
  );

  // Function to navigate weeks
  const handlePrevWeek = () => setSelectedDate(selectedDate.subtract(1, "week"));
  const handleNextWeek = () => setSelectedDate(selectedDate.add(1, "week"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        style={{ height, width }}
        value={selectedDate}
        onChange={(newValue) => {
            onDateChange(newValue); 
            setSelectedDate(newValue)
        }}
        views={['day']}
        slots={{
          day: (props) => {
            const { day } = props;
            return weekDays.some((d) => d.isSame(day, "day")) ? (
              <PickersDay {...props} />
            ) : null;
          },
          
          previousIconButton: () => (
              <IconButton onClick={handlePrevWeek}>
              <ArrowLeftIcon />
              </IconButton>
            ),
            nextIconButton: () => (
                <IconButton onClick={handleNextWeek}>
                <ArrowRightIcon />
                </IconButton>
            ),
            switchViewButton: () => null,
        }}
      />
    </LocalizationProvider>
  );
};

export default WeekCalendar;
