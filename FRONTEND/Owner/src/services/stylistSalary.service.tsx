import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';
import { EmployeeForm } from 'models/Employee.model';
import {
  DataEmployeeError,
  DataEmployeeSuccess,
  errorDefault,
  ListEmployeeSuccess,
} from 'models/EmployeeResponse.model';

class StylistSalaryServices {
  async list(params = {}) {
    try {
      const resData: ListEmployeeSuccess = await axios.get(
        `${ENDPOINTS.ApiPrefix}/StylistSalarys`,
        {
          params,
        },
      );
      return resData;
    } catch (error) {
      return {
        success: false,
        errors: error.errors || errorDefault,
      } as DataEmployeeError;
    }
  }
  async listStylistWorkship(params = {}) {
    try {
      const resData: ListEmployeeSuccess = await axios.get(
        `${ENDPOINTS.ApiPrefix}/StylistWorkships/MonthAndYear`,
        {
          params,
        },
      );
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
        `${ENDPOINTS.ApiPrefix}/StylistSalarys`,
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
        `${ENDPOINTS.ApiPrefix}/StylistSalarys/${id}`,
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
        `${ENDPOINTS.ApiPrefix}/StylistSalarys/${id}`,
      );
      return resData;
    } catch (error) {
      throw error;
    }
  }

  async findById(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/StylistSalaryDetails`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const stylistSalaryServices = new StylistSalaryServices();
