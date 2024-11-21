import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';
class EmployeeStylistServices {
  async list(params = {}) {
    try {
      const resData: any = await axios.get(`${ENDPOINTS.ApiPrefix}/Stylists`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async listStylistWorkships(params = {}) {
    try {
      const resData: any = await axios.get(`${ENDPOINTS.ApiPrefix}/StylistWorkships`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async create(data: any) {
    try {
      const resData: any = await axios.post(`${ENDPOINTS.ApiPrefix}/Stylists`, data);
      return resData;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      const resData: any = await axios.put(`${ENDPOINTS.ApiPrefix}/Stylists/${id}`, data);
      return resData;
    } catch (error) {
      // console.log(error, error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const resData: any = await axios.delete(`${ENDPOINTS.ApiPrefix}/Stylists/${id}`);
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const employeeStylistServices = new EmployeeStylistServices();
