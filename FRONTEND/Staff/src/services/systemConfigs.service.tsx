import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';

class SystemConfigServices {
  async getByName(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/systemConfigs`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const systemConfigService = new SystemConfigServices();
