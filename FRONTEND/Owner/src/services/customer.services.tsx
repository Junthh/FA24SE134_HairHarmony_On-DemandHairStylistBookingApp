import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';
import {
  DataEmployeeError,
  DataEmployeeSuccess,
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
  async update(id: string, data: any) {
    try {
      const formData = new FormData();
      formData.append('id', data.id);
      formData.append('avatar', data.avatar);
      formData.append('createdDate', data.createdDate);
      formData.append('fullName', data.fullName);
      formData.append('loyaltyPoints', data.loyaltyPoints);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('status', data.status);
      const resData: DataEmployeeSuccess = await axios.put(
        `${ENDPOINTS.ApiPrefix}/Customers/${id}`,
        formData,
      );
      return resData;
    } catch (error) {
      // console.log(error, error);
      throw error;
    }
  }
}

export const customerServices = new CustomerServices();
