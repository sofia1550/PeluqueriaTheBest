"use client"
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarContainer } from "./calendarStyled";

moment.tz.setDefault("America/New_York");
const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: "Evento 1",
    start: new Date(),
    end: new Date(),
  },
  // Agrega más eventos aquí
];

const MyCalendar: React.FC = () => {
  return (
    <CalendarContainer>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    </CalendarContainer>
  );
};

export default MyCalendar;
