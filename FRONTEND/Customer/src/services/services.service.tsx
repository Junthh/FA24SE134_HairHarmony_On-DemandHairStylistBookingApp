import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';

class ServiceServices {
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
}

export const serviceServices = new ServiceServices();
