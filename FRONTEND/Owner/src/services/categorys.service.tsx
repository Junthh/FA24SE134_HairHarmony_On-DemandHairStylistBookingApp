import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';
import { DataEmployeeError, errorDefault } from 'models/EmployeeResponse.model';

class CategorysServices {
  async list(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/Categorys`, {
        params,
      });
      return resData;
    } catch (error) {
       throw error;
    }
  }
  async create(data: any) {
    try {
      const resData = await axios.post(`${ENDPOINTS.ApiPrefix}/Categorys`, data);
      return resData;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      const resData = await axios.put(`${ENDPOINTS.ApiPrefix}/Categorys/${id}`, data);
      return resData;
    } catch (error) {
      // console.log(error, error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const resData = await axios.delete(`${ENDPOINTS.ApiPrefix}/Categorys/${id}`);
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const categorysServices = new CategorysServices();
