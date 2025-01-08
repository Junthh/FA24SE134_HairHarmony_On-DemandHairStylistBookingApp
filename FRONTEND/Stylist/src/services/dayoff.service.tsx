import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';

class DayOffService {
  async list(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/dayoffs`, { params });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async create(body) {
    try {
      const resData: any = await axios.post(`${ENDPOINTS.ApiPrefix}/dayoffs`, body);
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async update(id, body) {
    try {
      const resData: any = await axios.put(`${ENDPOINTS.ApiPrefix}/dayoffs/${id}`, body);
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async delete(id) {
    try {
      const resData: any = await axios.delete(`${ENDPOINTS.ApiPrefix}/dayoffs/${id}`);
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const dayOffService = new DayOffService();
