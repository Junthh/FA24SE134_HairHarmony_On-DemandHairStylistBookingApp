import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';

class StylistSalaryServices {
  async list(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/StylistSalarys`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async findById(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/StylistSalaryDetails`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async listStylistWorkship(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/StylistWorkships/MonthAndYear`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const stylistSalaryServices = new StylistSalaryServices();
