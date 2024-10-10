import axios from 'axios';
import { ECOCUPID_ENDPOINTS } from 'configurations/constants/globalConstants';
import { ProjectForm } from 'models/ProjectModel';
import {
  DataServiceError,
  DataServiceSuccess,
  ListServiceSuccess,
  OptionServiceSuccess,
  errorDefault,
} from 'models/ServiceResponse.model';
import { base64ToFile } from 'utils/helper';

class ProjectService {
  async options() {
    try {
      const params = {
        select: 'title',
      };
      const resData: OptionServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/projects/all`,
        { params },
      );
      const resProjects = resData.data;
      let data = [];
      if (resProjects.length !== 0) {
        data = resProjects.reduce((accumulator: Array<any>, currentValue: any) => {
          return [
            ...accumulator,
            {
              label: currentValue.title,
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

  async find(id: string) {
    try {
      const resData: DataServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/projects/${id}`,
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

  async list(params = {}) {
    try {
      const resData: ListServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/projects`,
        { params },
      );
      const resProjects = resData.data;
      let data = [];
      if (resData.data.length !== 0) {
        data = resProjects.reduce((accumulator: Array<any>, currentValue: any) => {
          return [
            ...accumulator,
            {
              ...currentValue,
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

  async create(data: ProjectForm) {
    try {
      let formData: any = new FormData();
      formData = { ...data };
      const resData: DataServiceSuccess = await axios.post(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/projects`,
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

  async update(id: string, data: ProjectForm) {
    try {
      let formData: any = new FormData();
      formData = { ...data };
      const resData: DataServiceSuccess = await axios.put(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/projects/${id}`,
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

  async delete(id: string) {
    try {
      const resData: DataServiceSuccess = await axios.delete(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/projects/${id}`,
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

export const projectService = new ProjectService();
