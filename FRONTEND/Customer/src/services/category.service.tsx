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
      const resData: ListServiceSuccess = await axios.get(`${ENDPOINTS.ApiPrefix}/Categorys`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const categoryService = new CategoryService();
