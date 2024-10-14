import axios from 'axios';
import { ECOCUPID_ENDPOINTS } from 'configurations/constants/globalConstants';
import { ArticleForm } from 'models/Article.model';
import {
  DataServiceError,
  DataServiceSuccess,
  ListServiceSuccess,
  errorDefault,
} from 'models/ServiceResponse.model';
import { formatDate } from 'utils/datetime';
import { base64ToFile } from 'utils/helper';

class ArticleService {
  async list(params = {}) {
    try {
      const resData: ListServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/articles`,
        {
          params,
        },
      );
      const resArticles = resData.data;
      let data = [];
      if (resData.data.length !== 0) {
        data = resArticles.reduce((accumulator: Array<any>, currentValue: any) => {
          return [
            ...accumulator,
            {
              ...currentValue,
              createdAt: formatDate(currentValue.category.createdAt),
              categoryName: currentValue.category.name,
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

  async create(data: ArticleForm) {
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
      const resData: DataServiceSuccess = await axios.post(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/articles`,
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
      } as DataServiceError;
    }
  }

  async update(id: string, data: ArticleForm) {
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
      const resData: DataServiceSuccess = await axios.put(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/articles/${id}`,
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
      } as DataServiceError;
    }
  }

  async find(id: string) {
    try {
      const resData: DataServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/articles/${id}`,
      );
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
      } as DataServiceError;
    }
  }

  async delete(id: string) {
    try {
      const resData: DataServiceSuccess = await axios.delete(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/articles/${id}`,
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

export const articleService = new ArticleService();
