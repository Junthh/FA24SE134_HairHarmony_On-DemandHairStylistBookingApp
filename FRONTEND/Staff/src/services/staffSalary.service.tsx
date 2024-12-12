import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';

class StaffSalaryServices {
  async list(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/StaffSalarys`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async findById(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/StaffSalaryDetails`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async listStaffWorkship(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/StaffWorkships/MonthAndYear`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const staffSalaryServices = new StaffSalaryServices();
