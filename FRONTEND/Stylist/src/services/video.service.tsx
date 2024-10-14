import axios from 'axios';
import { ECOCUPID_ENDPOINTS } from 'configurations/constants/globalConstants';
import {
  DataServiceSuccess,
  DataServiceError,
  ListServiceSuccess,
  errorDefault,
} from 'models/ServiceResponse.model';
import { VideoForm } from 'models/Video.model';
import { formatDate } from 'utils/datetime';
import { base64ToFile } from 'utils/helper';

class VideoService {
  async list(params = {}) {
    try {
      const resData: ListServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/videos`,
        { params },
      );
      const resVideo = resData.data;
      let data = [];
      if (resData.data.length !== 0) {
        data = resVideo.reduce((accumulator: Array<any>, currentValue: any) => {
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

  async create(data: VideoForm) {
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
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/videos`,
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

  async update(id: string, data: VideoForm) {
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
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/videos/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const videoData = resData.data;
      if (videoData.tags.length !== 0) {
        const cusTags = videoData.tags.reduce((accumulator: Array<any>, currentValue: any) => {
          return [...accumulator, { tag: currentValue.name }];
        }, []);
        videoData.tags = cusTags;
      }
      return {
        success: resData.success,
        data: videoData,
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
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/videos/${id}`,
      );
      const videoData = resData.data;
      if (videoData.tags.length !== 0) {
        const cusTags = videoData.tags.reduce((accumulator: Array<any>, currentValue: any) => {
          return [...accumulator, { tag: currentValue.name }];
        }, []);
        videoData.tags = cusTags;
      }
      if (videoData.thumbnailUrl) {
        videoData.thumbnailUrl = await base64ToFile(videoData.thumbnailUrl, new Date().getTime());
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
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/videos/${id}`,
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

export const videoService = new VideoService();
