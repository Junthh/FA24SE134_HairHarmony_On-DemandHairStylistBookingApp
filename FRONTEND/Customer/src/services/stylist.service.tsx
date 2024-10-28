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
}

export const stylistServices = new StylistServices();
