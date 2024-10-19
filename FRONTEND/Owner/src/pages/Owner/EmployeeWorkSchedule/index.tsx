import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box } from '@mui/material';
import styled from '@emotion/styled';

const EmployeeWorkScheduleStyled = styled(Box)({
  padding: 20,
  '& .fc-direction-ltr': {
    maxHeight: 'calc(100vh - 205px)',
  },
});
//
export default function EmployeeWorkSchedule() {
  return (
    <EmployeeWorkScheduleStyled>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'timeGridWeek,timeGridDay', // user can switch between the two
        }}
        events={[
          { title: 'event 1', date: new Date() },
          { title: 'event 2', date: '2019-04-02' },
        ]}
      />
    </EmployeeWorkScheduleStyled>
  );
}
