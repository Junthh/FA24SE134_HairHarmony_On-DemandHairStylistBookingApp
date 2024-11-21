import axios from 'axios';
import { ECOCUPID_ENDPOINTS } from 'configurations/constants/globalConstants';

class SystemConfigServices {
  async getByName(params = {}) {
    try {
      const resData = await axios.get(`${ECOCUPID_ENDPOINTS.ApiPrefix}/systemConfigs`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const systemConfigService = new SystemConfigServices();
