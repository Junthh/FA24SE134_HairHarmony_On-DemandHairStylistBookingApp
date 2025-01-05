import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';
import { EmployeeForm } from 'models/Employee.model';
import {
  DataEmployeeError,
  DataEmployeeSuccess,
  errorDefault,
  ListEmployeeSuccess,
} from 'models/EmployeeResponse.model';

class DayOffServices {
  async list(params = {}) {
    try {
      const resData: ListEmployeeSuccess = await axios.get(`${ENDPOINTS.ApiPrefix}/dayOffs`, {
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

  async update(id: string, data: EmployeeForm) {
    try {
      const resData: DataEmployeeSuccess = await axios.put(
        `${ENDPOINTS.ApiPrefix}/dayOffs/${id}`,
        data,
      );
      return resData;
    } catch (error) {
      // console.log(error, error);
      throw error;
    }
  }
}

export const dayOffServices = new DayOffServices();
