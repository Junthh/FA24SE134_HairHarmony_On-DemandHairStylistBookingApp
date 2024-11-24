import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';

class StylistServices {
  async list(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/Stylists`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async findById(id: string) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/Stylists/${id}`);
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const stylistServices = new StylistServices();
