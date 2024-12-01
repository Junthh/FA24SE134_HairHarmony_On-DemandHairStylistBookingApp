import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';
import { CategoryForm } from 'models/Category.model';
import {
  DataServiceError,
  DataServiceSuccess,
  ListServiceSuccess,
  OptionServiceSuccess,
  errorDefault,
} from 'models/ServiceResponse.model';

class CategoryService {
  async list(params = {}) {
    try {
      const resData: ListServiceSuccess = await axios.get(`${ENDPOINTS.ApiPrefix}/categories`, {
        params,
      });
      const resWriters = resData.data;
      let data = [];
      if (resData.data.length !== 0) {
        data = resWriters.reduce((accumulator: Array<[]>, currentValue: any) => {
          return [
            ...accumulator,
            {
              ...currentValue,
              name: currentValue.name,
              actions: currentValue.id,
            },
          ];
        }, []);
      }
      return {
        success: resData.success,
        data,
        meta: resData.meta,
      };
    } catch (error) {
      return {
        success: false,
        errors: error.errors || errorDefault,
      } as DataServiceError;
    }
  }

  async listComboAndServices() {
    try {
      const resData: ListServiceSuccess = await axios.get(
        `${ENDPOINTS.ApiPrefix}/Categorys/ComboAndService`,
      );
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async colorOptions() {
    try {
      const params = { select: 'name,color' };
      const resData: OptionServiceSuccess = await axios.get(
        `${ENDPOINTS.ApiPrefix}/categories/all`,
        { params },
      );
      const resCategories = resData.data;
      let data = [];
      if (resCategories.length !== 0) {
        data = resCategories.reduce(
          (accumulator: Array<any>, currentValue: any) => {
            return [
              ...accumulator,
              {
                label: currentValue.name,
                value: currentValue._id,
                color: currentValue.color,
              },
            ];
          },
          [{ label: 'All categories', id: 'undefined', color: '' }],
        );
      }
      return {
        success: resData.success,
        data,
      };
    } catch (error) {
      return {
        success: false,
        errors: error.errors || errorDefault,
      } as DataServiceError;
    }
  }

  async find(id: string) {
    try {
      const resData: DataServiceSuccess = await axios.get(
        `${ENDPOINTS.ApiPrefix}/categories/${id}`,
      );
      return {
        success: resData.success,
        data: resData.data,
      };
    } catch (error) {
      return {
        success: false,
        errors: error.errors || errorDefault,
      } as DataServiceError;
    }
  }

  async create(data: CategoryForm) {
    try {
      const resData: DataServiceSuccess = await axios.post(
        `${ENDPOINTS.ApiPrefix}/categories`,
        data,
      );
      return {
        success: resData.success,
        data: resData.data,
      };
    } catch (error) {
      return {
        success: false,
        errors: error.errors || errorDefault,
      } as DataServiceError;
    }
  }

  async update(id: string, data: CategoryForm) {
    try {
      const resData: DataServiceSuccess = await axios.put(
        `${ENDPOINTS.ApiPrefix}/categories/${id}`,
        data,
      );
      return {
        success: resData.success,
        data: resData.data,
      };
    } catch (error) {
      return {
        success: false,
        errors: error.errors || errorDefault,
      } as DataServiceError;
    }
  }

  async delete(id: string) {
    try {
      const resData: DataServiceSuccess = await axios.delete(
        `${ENDPOINTS.ApiPrefix}/categories/${id}`,
      );
      return {
        success: resData.success,
        data: resData.data,
      };
    } catch (error) {
      return {
        success: false,
        errors: error.errors || errorDefault,
      } as DataServiceError;
    }
  }
}

export const categoryService = new CategoryService();
