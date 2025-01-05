import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';

class WorkshipService {
  async list(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/Workships`, { params });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async listWorkshipStylist(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/StylistWorkships`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async createWorkshipStylist(body) {
    try {
      const resData: any = await axios.post(`${ENDPOINTS.ApiPrefix}/StylistWorkships`, body);
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async updateWorkshipStylist(id, body) {
    try {
      const resData: any = await axios.put(`${ENDPOINTS.ApiPrefix}/StylistWorkships/${id}`, body);
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async deleteWorkshipStylist(id) {
    try {
      const resData: any = await axios.delete(`${ENDPOINTS.ApiPrefix}/StylistWorkships/${id}`);
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const workshipService = new WorkshipService();
