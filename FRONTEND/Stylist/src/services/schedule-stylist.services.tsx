import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';

class ScheduleStylistServices {
  async list(params = {}) {
    try {
      const resData: any = await axios.get(`${ENDPOINTS.ApiPrefix}/BookingSlotStylists`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async create(data: any) {
    try {
      const resData: any = await axios.post(`${ENDPOINTS.ApiPrefix}/BookingSlotStylists`, data);
      return resData;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      const resData: any = await axios.put(
        `${ENDPOINTS.ApiPrefix}/BookingSlotStylists/${id}`,
        data,
      );
      return resData;
    } catch (error) {
      // console.log(error, error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const resData: any = await axios.delete(`${ENDPOINTS.ApiPrefix}/BookingSlotStylists/${id}`);
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const scheduleStylistServices = new ScheduleStylistServices();
