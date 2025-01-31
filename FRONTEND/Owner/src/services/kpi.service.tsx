import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';
import { EmployeeForm } from 'models/Employee.model';
import {
  DataEmployeeError,
  DataEmployeeSuccess,
  errorDefault,
  ListEmployeeSuccess,
} from 'models/EmployeeResponse.model';

class KpiServices {
  async list(params = {}) {
    try {
      const resData: ListEmployeeSuccess = await axios.get(`${ENDPOINTS.ApiPrefix}/Kpis`, {
        params,
      });
      return resData;
    } catch (error) {
      return {
        success: false,
        errors: error.errors || errorDefault,
      } as DataEmployeeError;
    }
  }
  async create(data: EmployeeForm) {
    try {
      const resData: DataEmployeeSuccess = await axios.post(`${ENDPOINTS.ApiPrefix}/Kpis`, data);
      return resData;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: EmployeeForm) {
    try {
      const resData: DataEmployeeSuccess = await axios.put(
        `${ENDPOINTS.ApiPrefix}/Kpis/${id}`,
        data,
      );
      return resData;
    } catch (error) {
      // console.log(error, error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const resData: ListEmployeeSuccess = await axios.delete(`${ENDPOINTS.ApiPrefix}/Kpis/${id}`);
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const kpiServices = new KpiServices();
