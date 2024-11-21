import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';

class NewsServices {
  async list(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/News`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async findById(id) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/News/${id}`);
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async create(body) {
    try {
      const resData = await axios.post(`${ENDPOINTS.ApiPrefix}/News`, body);
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async update(id, body) {
    try {
      const resData = await axios.put(`${ENDPOINTS.ApiPrefix}/News/${id}`, body);
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async delete(id) {
    try {
      const resData = await axios.delete(`${ENDPOINTS.ApiPrefix}/News/${id}`);
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const newsServices = new NewsServices();
