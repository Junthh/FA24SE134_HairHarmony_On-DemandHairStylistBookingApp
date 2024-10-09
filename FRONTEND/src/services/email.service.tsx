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
import { formatDate } from 'utils/datetime';

class EmailService {
  async list(params = {}) {
    try {
      const resData: ListServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/subcribes`,
        { params },
      );
      const resEmail = resData.data;
      let data = [];
      if (resData.data.length !== 0) {
        data = resEmail.reduce((accumulator: Array<[]>, currentValue: any) => {
          return [
            ...accumulator,
            {
              ...currentValue,
              email: currentValue.email,
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

  async delete(id: string) {
    try {
      const resData: DataServiceSuccess = await axios.delete(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/subcribes/${id}`,
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

export const emailService = new EmailService();
