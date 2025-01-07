import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';

class TimekeepingServices {
  async list(params = {}) {
    try {
      const resData: any = await axios.get(`${ENDPOINTS.ApiPrefix}/timekeepings`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      const resData: any = await axios.put(`${ENDPOINTS.ApiPrefix}/timekeepings/${id}`, data);
      return resData;
    } catch (error) {
      // console.log(error, error);
      throw error;
    }
  }
}

export const timekeepingServices = new TimekeepingServices();
