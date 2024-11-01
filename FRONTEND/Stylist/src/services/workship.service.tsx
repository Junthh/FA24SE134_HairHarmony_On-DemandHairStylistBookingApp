import axios from 'axios';
import { ECOCUPID_ENDPOINTS } from 'configurations/constants/globalConstants';
import { CategoryForm } from 'models/Category.model';
import {
  DataServiceError,
  DataServiceSuccess,
  ListServiceSuccess,
  OptionServiceSuccess,
  errorDefault,
} from 'models/ServiceResponse.model';

class WorkshipService {
  async list(params = {}) {
    try {
      const resData = await axios.get(`${ECOCUPID_ENDPOINTS.ApiPrefix}/Workships`, { params });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async listWorkshipStylist(params = {}) {
    try {
      const resData = await axios.get(`${ECOCUPID_ENDPOINTS.ApiPrefix}/StylistWorkships`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async createWorkshipStylist(body) {
    try {
      const resData: ListServiceSuccess = await axios.post(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/StylistWorkships`,
        body,
      );
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const workshipService = new WorkshipService();
