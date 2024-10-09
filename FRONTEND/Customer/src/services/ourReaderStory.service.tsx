import axios from 'axios';
import { ECOCUPID_ENDPOINTS } from 'configurations/constants/globalConstants';
import { OurReaderStoryForm } from 'models/OurReaderStory.model';
import {
  DataServiceError,
  DataServiceSuccess,
  ListServiceSuccess,
  errorDefault,
} from 'models/ServiceResponse.model';
import { formatDate } from 'utils/datetime';
import { base64ToFile } from 'utils/helper';

class OurReaderStoryService {
  async list(params = {}) {
    try {
      const resData: ListServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/our-reader-stories`,
        {
          params,
        },
      );
      const resOurReaderStories = resData.data;
      let data = [];
      if (resData.data.length !== 0) {
        data = resOurReaderStories.reduce((accumulator: Array<any>, currentValue: any) => {
          return [
            ...accumulator,
            {
              ...currentValue,
              createdAt: formatDate(currentValue.createdAt),
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

  async create(data: OurReaderStoryForm) {
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
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/our-reader-stories`,
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

  async update(id: string, data: OurReaderStoryForm) {
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
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/our-reader-stories/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const ourReaderStoryData = resData.data;
      if (ourReaderStoryData.tags.length !== 0) {
        const cusTags = ourReaderStoryData.tags.reduce(
          (accumulator: Array<any>, currentValue: any) => {
            return [...accumulator, { tag: currentValue.name }];
          },
          [],
        );
        ourReaderStoryData.tags = cusTags;
      }
      return {
        success: resData.success,
        data: ourReaderStoryData,
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
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/our-reader-stories/${id}`,
      );
      const ourReaderStoryData = resData.data;
      if (ourReaderStoryData.tags.length !== 0) {
        const cusTags = ourReaderStoryData.tags.reduce(
          (accumulator: Array<any>, currentValue: any) => {
            return [...accumulator, { tag: currentValue.name }];
          },
          [],
        );
        ourReaderStoryData.tags = cusTags;
      }
      if (ourReaderStoryData.imageUrl) {
        ourReaderStoryData.imageUrl = await base64ToFile(
          ourReaderStoryData.imageUrl,
          new Date().getTime(),
        );
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
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/our-reader-stories/${id}`,
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

export const ourReaderStoryService = new OurReaderStoryService();
