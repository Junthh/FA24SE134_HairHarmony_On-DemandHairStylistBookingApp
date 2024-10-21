import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';
import { EmployeeForm } from 'models/Employee.model';
import {
  DataEmployeeError,
  DataEmployeeSuccess,
  errorDefault,
  ListEmployeeSuccess,
} from 'models/EmployeeResponse.model';
import { formatDate } from 'utils/datetime';
import { base64ToFile } from 'utils/helper';

class ServicesService {
  async list(params = {}) {
    try {
      const resData: ListEmployeeSuccess = await axios.get(`${ENDPOINTS.ApiPrefix}/Services`, {
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
      const resData: DataEmployeeSuccess = await axios.post(
        `${ENDPOINTS.ApiPrefix}/Services`,
        data,
      );
      return resData;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: EmployeeForm) {
    try {
      const resData: DataEmployeeSuccess = await axios.put(
        `${ENDPOINTS.ApiPrefix}/Services/${id}`,
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
      const resData: ListEmployeeSuccess = await axios.delete(
        `${ENDPOINTS.ApiPrefix}/Services/${id}`,
      );
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const servicesService = new ServicesService();
