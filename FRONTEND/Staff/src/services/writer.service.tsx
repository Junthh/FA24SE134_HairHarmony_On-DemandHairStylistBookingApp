import axios from 'axios';
import { ECOCUPID_ENDPOINTS } from 'configurations/constants/globalConstants';
import {
  DataServiceSuccess,
  DataServiceError,
  ListServiceSuccess,
  errorDefault,
  OptionServiceSuccess,
} from 'models/ServiceResponse.model';
import { WriterForm } from 'models/Writer.model';
import { base64ToFile } from 'utils/helper';

class WriterService {
  async list(params = {}) {
    try {
      const resData: ListServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/writers`,
        { params },
      );
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

  async create(data: WriterForm) {
    try {
      let formData: any = new FormData();
      formData = { ...data };
      const resData: DataServiceSuccess = await axios.post(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/writers`,
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

  async update(id: string, data: WriterForm) {
    try {
      let formData: any = new FormData();
      formData = { ...data };
      const resData: DataServiceSuccess = await axios.put(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/writers/${id}`,
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

  async find(id: string) {
    try {
      const resData: DataServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/writers/${id}`,
      );
      if (resData.data.imageUrl) {
        resData.data.imageUrl = await base64ToFile(resData.data.imageUrl, new Date().getTime());
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
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/writers/${id}`,
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

  async options() {
    try {
      const params = {
        select: 'name',
      };
      const resData: OptionServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/writers/all`,
        { params },
      );
      const resWriters = resData.data;
      let data = [];
      if (resWriters.length !== 0) {
        data = resWriters.reduce((accumulator: Array<any>, currentValue: any) => {
          return [
            ...accumulator,
            {
              label: currentValue.name,
              value: currentValue._id,
            },
          ];
        }, []);
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
}

export const writerService = new WriterService();
