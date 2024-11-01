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
      return {
        success: false,
        errors: error.errors || errorDefault,
      } as DataEmployeeError;
    }
  }
}

export const categorysServices = new CategorysServices();
