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
      let formData: any = new FormData();
      if (data.tags) {
        if (data.tags.length === 0) {
          const { tags, ...rest } = data;
          data = { ...rest };
        } else {
          const { tags } = data;
          const cusTags = tags.reduce((accumulator: Array<any>, currentValue: any) => {
            return [...accumulator, currentValue.tag];
          }, []);
          data.tags = cusTags;
        }
      }
      if (data.isFeature === undefined) {
        const { isFeature, ...rest } = data;
        data = { ...rest };
      }
      formData = { ...data };
      const resData: DataEmployeeSuccess = await axios.post(
        `${ENDPOINTS.ApiPrefix}/articles`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
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

  async update(id: string, data: EmployeeForm) {
    try {
      let formData: any = new FormData();
      if (data.tags) {
        if (data.tags.length === 0) {
          const { tags, ...rest } = data;
          data = { ...rest };
        } else {
          const { tags } = data;
          const cusTags = tags.reduce((accumulator: Array<any>, currentValue: any) => {
            return [...accumulator, currentValue.tag];
          }, []);
          data.tags = cusTags;
        }
      }
      if (data.isFeature === undefined) {
        const { isFeature, ...rest } = data;
        data = { ...rest };
      }
      formData = { ...data };
      const resData: DataEmployeeSuccess = await axios.put(
        `${ENDPOINTS.ApiPrefix}/articles/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const articleData = resData.data;
      if (articleData.tags.length !== 0) {
        const cusTags = articleData.tags.reduce((accumulator: Array<any>, currentValue: any) => {
          return [...accumulator, { tag: currentValue.name }];
        }, []);
        articleData.tags = cusTags;
      }
      return {
        success: resData.success,
        data: articleData,
      };
    } catch (error) {
      // console.log(error, error);
      return {
        success: false,
        errors: error.errors || errorDefault,
      } as DataEmployeeError;
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
