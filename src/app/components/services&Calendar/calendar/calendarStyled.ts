import styled from "styled-components";
import { Calendar as BigCalendar } from "react-big-calendar";

export const CalendarContainer = styled.div`
  width: 100%;
  height: 80vh;
  background-color: #1c1c1c;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #f8f9fa;
  border: 1px solid rgba(255, 215, 0, 0.3);

  .rbc-calendar {
    background: transparent;
    color: #f8f9fa;
  }

  .rbc-toolbar {
    background: rgba(28, 28, 28, 0.8);
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .rbc-toolbar button {
    color: #ffd700;
    background: #1c1c1c;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 0.5rem;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .rbc-toolbar button:hover {
    background: #ffd700;
    color: #1c1c1c;
  }

  .rbc-event {
    background: #ffd700;
    border: 1px solid #1c1c1c;
    color: #1c1c1c;
  }

  .rbc-day-bg,
  .rbc-time-slot {
    border-color: rgba(255, 215, 0, 0.3);
  }

  .rbc-day-slot .rbc-time-slot {
    border-top: 1px solid rgba(255, 215, 0, 0.3);
  }
`;
