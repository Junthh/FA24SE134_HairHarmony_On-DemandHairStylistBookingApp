import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';
import { DataEmployeeError, errorDefault } from 'models/EmployeeResponse.model';

class RolesServices {
  async list(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/Roles`, {
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

export const rolesServices = new RolesServices();
