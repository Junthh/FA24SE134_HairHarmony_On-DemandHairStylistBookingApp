import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';
import {
  DataEmployeeError,
  errorDefault,
  ListEmployeeSuccess,
} from 'models/EmployeeResponse.model';

class CustomerServices {
  async list(params = {}) {
    try {
      const resData: ListEmployeeSuccess = await axios.get(`${ENDPOINTS.ApiPrefix}/Customers`, {
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
}

export const customerServices = new CustomerServices();
