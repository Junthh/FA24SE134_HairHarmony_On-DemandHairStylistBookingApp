import React, { useCallback, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { employeeStylistServices } from 'services/employee-stylist.services';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import moment from 'moment';

const EmployeeWorkScheduleStyled = styled(Box)({
  padding: 20,
  '& .fc-direction-ltr': {
    maxHeight: 'calc(100vh - 205px)',
  },
});

export default function EmployeeWorkSchedule() {
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();

  const handleGetStylistWorkships = useCallback(
    async (dateInfo) => {
      dispatch(setLoading(true));
      try {
        const params = {
          startDate: moment(dateInfo.start).format('YYYY/MM/DD'),
          endDate: moment(dateInfo.end).format('YYYY/MM/DD'),
        };

        const res = (await employeeStylistServices.listStylistWorkships(params)) as any;
        const newEvents = res.data.map((item) => ({
          title: ` ${item.stylist.fullName}`,
          start: moment(
            `${item.registerDate} ${item.workship.startTime}`,
            'YYYY-MM-DD HH:mm:ss',
          ).toISOString(),
          end: moment(
            `${item.registerDate} ${item.workship.endTime}`,
            'YYYY-MM-DD HH:mm:ss',
          ).toISOString(),
        }));
        setEvents(newEvents);
      } catch (error) {
        console.error('Failed to fetch stylist workships:', error);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch],
  );

  const renderEventContent = (eventInfo) => (
    <div title={eventInfo.event.title}>
      <b>{eventInfo.timeText}</b>
      <br />
      <p>{eventInfo.event.title}</p>
    </div>
  );

  return (
    <EmployeeWorkScheduleStyled>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'timeGridWeek,timeGridDay',
        }}
        events={events}
        datesSet={handleGetStylistWorkships} // Only relying on datesSet for data fetching
        eventContent={renderEventContent}
      />
    </EmployeeWorkScheduleStyled>
  );
}
