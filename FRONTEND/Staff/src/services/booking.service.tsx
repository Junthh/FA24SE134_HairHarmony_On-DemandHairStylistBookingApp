import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';

class BookingServices {
  async listTimeSlots(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/TimeSlots`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async listStylistFreeTime(params = {}) {
    try {
      const resData = await axios.get(
        `${ENDPOINTS.ApiPrefix}/BookingSlotStylists/StylistFreetime`,
        {
          params,
        },
      );
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async list(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/Services`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async listBookingHistory(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/Bookings`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async bookingInit(body) {
    try {
      const resData = await axios.post(`${ENDPOINTS.ApiPrefix}/Bookings/Init`, body);
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const bookingServices = new BookingServices();
