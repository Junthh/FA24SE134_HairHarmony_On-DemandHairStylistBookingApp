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

class EmployeeServices {
  async list(params = {}) {
    try {
      const resData: ListEmployeeSuccess = await axios.get(`${ENDPOINTS.ApiPrefix}/Users`, {
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
        `${ENDPOINTS.ApiPrefix}/Users`,
        data,
      );
      return resData
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: EmployeeForm) {
    try {
      const resData: DataEmployeeSuccess = await axios.put(
        `${ENDPOINTS.ApiPrefix}/Users/${id}`,
        data,
      );
      return resData;
    } catch (error) {
      // console.log(error, error);
      throw error;
    }
  }

  async find(id: string) {
    try {
      const resData: DataEmployeeSuccess = await axios.get(`${ENDPOINTS.ApiPrefix}/articles/${id}`);
      const articleData = resData.data;
      if (articleData.tags.length !== 0) {
        const cusTags = articleData.tags.reduce((accumulator: Array<any>, currentValue: any) => {
          return [...accumulator, { tag: currentValue.name }];
        }, []);
        articleData.tags = cusTags;
      }
      if (articleData.imageUrl) {
        articleData.imageUrl = await base64ToFile(articleData.imageUrl, new Date().getTime());
      }
      return {
        success: resData.success,
        data: resData.data,
      };
    } catch (error) {
      return {
        success: false,
        errors: error.errors || errorDefault,
      } as DataEmployeeError;
    }
  }

  async delete(id: string) {
    try {
      const resData: ListEmployeeSuccess = await axios.delete(`${ENDPOINTS.ApiPrefix}/Users/${id}`);
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const employeeServices = new EmployeeServices();
