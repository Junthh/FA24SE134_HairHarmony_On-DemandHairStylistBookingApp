import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';

class ScheduleListServices {
  async list(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/bookings`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async update(payload: any = {}) {
    try {
      const resData = await axios.put(
        `${ENDPOINTS.ApiPrefix}/bookings/${payload.id}`,
        payload,
      );
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const scheduleListServices = new ScheduleListServices();
