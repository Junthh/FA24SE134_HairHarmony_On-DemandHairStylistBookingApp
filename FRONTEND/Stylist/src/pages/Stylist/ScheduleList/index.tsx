import React, { useCallback, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import moment from 'moment';
import { scheduleStylistServices } from 'services/schedule-stylist.services';

const EmployeeWorkScheduleStyled = styled(Box)({
  padding: 20,
  '& .fc-direction-ltr': {
    maxHeight: 'calc(100vh - 205px)',
  },
  '& .fc-event-title': {
    whiteSpace: 'pre-wrap', // Hỗ trợ xuống dòng
    wordBreak: 'break-word', // Đảm bảo từ dài không gây lỗi giao diện
  },
});

export default function ScheduleList() {
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

        const res = (await scheduleStylistServices.list(params)) as any;
        const newEvents = res.data.map((item) => ({
          title: `${item.bookingDetail?.service?.name || ''} \n${
            item.bookingDetail.booking.customer.fullName
          }`,
          start: moment(
            `${item.bookingDate} ${item.timeSlot.startTime}`,
            'YYYY-MM-DD HH:mm:ss',
          ).toISOString(),
          end: moment(
            `${item.bookingDate} ${item.timeSlot.endTime}`,
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
      <p style={{ whiteSpace: 'pre-wrap' }}>{eventInfo.event.title}</p>
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
