import axios from 'axios';
import { ECOCUPID_ENDPOINTS } from 'configurations/constants/globalConstants';
import { PostTypeEnum, PostsParams } from 'models/Posts.model';
import {
  DataServiceError,
  DataServiceSuccess,
  ListServiceSuccess,
  errorDefault,
} from 'models/ServiceResponse.model';
import { ECO_HEROES_IMAGES } from 'pages/Users/Home/mock';

class PostsService {
  async list(params: PostsParams = {}) {
    if (!params.type) {
      params['type'] = PostTypeEnum.All;
    }

    try {
      const resData: ListServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/ecocupid`,
        { params },
      );
      const resProjects = resData.data;
      let data = [];
      if (resProjects.length !== 0) {
        data = resProjects.reduce((accumulator: Array<any>, currentValue: any) => {
          return [
            ...accumulator,
            {
              ...currentValue,
              tags: currentValue.tags.join('&#&'),
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
      };
    }
  }

  async getPostDetail(id: string, type: PostTypeEnum) {
    const params = { type };
    try {
      const resData: DataServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/ecocupid/detail/${id}`,
        { params },
      );

      let tagNormalize = '';
      if (resData.success && resData?.data?.tags?.length) {
        tagNormalize = resData.data.tags.join('&#&');
      }

      return {
        success: resData.success,
        data: {
          ...resData.data,
          tags: tagNormalize,
        },
      };
    } catch (error) {
      return {
        success: false,
        errors: error.errors || errorDefault,
      };
    }
  }

  async getRelatedPosts(params: { projectId: string }) {
    try {
      const resData: ListServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/ecocupid/detail-related`,
        { params },
      );
      const resProjects = resData.data;
      let data = [];
      if (resProjects.length !== 0) {
        data = resProjects.reduce((accumulator: Array<any>, currentValue: any) => {
          let tagNormalize = '';
          if (resData.success && currentValue.tags?.length) {
            tagNormalize = currentValue.tags.join('&#&');
          }
          return [
            ...accumulator,
            {
              ...currentValue,
              tags: tagNormalize,
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
      };
    }
  }

  async getCategoriesOptions() {
    try {
      const resData: ListServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/ecocupid/categories/all`,
      );
      const resWriters = resData.data;
      let data = [];
      if (resData.data.length !== 0) {
        data = resWriters.reduce((accumulator: Array<[]>, currentValue: any) => {
          return [
            ...accumulator,
            {
              ...currentValue,
              id: currentValue._id,
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

  async getFeaturedCategories() {
    const res = (await this.getCategoriesOptions()) as any;
    let data = [];
    if (res.success) {
      data = res.data.sort((a, b) => b.articles.length - a.articles.length).slice(0, 3);

      return {
        ...res,
        data,
      };
    }

    return res;
  }

  async getFeaturedProjects(params: { perPage: number }) {
    try {
      const resData: ListServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/ecocupid/featured`,
        { params },
      );
      const resWriters = resData.data;
      let data = [];
      if (resData.data.length !== 0) {
        data = resWriters
          .sort((a, b) => b.qtyArticle + b.qtyVideo - (a.qtyArticle + a.qtyVideo))
          .slice(0, 4)
          .map((item, index) => {
            return {
              ...item,
              // imageUrl: ECO_HEROES_IMAGES[index],
            };
          });
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

  async getCountry(params: { country: string }) {
    try {
      const resData: DataServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/ecocupid/project-of-country`,
        { params },
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

  async getListCountriesHomePage() {
    try {
      const resData: ListServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/ecocupid/list-project-country`,
      );
      const resCountries = resData.data;
      let data;
      let totalProject = 0
      if (resData.data.length !== 0) {
        data = resCountries.reduce((accumulator: Array<[]>, currentValue: any) => {
          totalProject += currentValue.qty
          return {
            ...accumulator,
            [currentValue.country]: {
              ...currentValue,
              imageUrls: currentValue.imageUrls.slice(0, 3),
            },
          };
          // return [
          //   ...accumulator,
          //   {
          //     ...currentValue,
          //     imageUrls: currentValue.imageUrls.slice(0, 3),
          //   },
          // ];
        }, {});
      }
      return {
        success: resData.success,
        data: {
          countries: data,
          totalProject
        },
      };
    } catch (error) {
      return {
        success: false,
        errors: error.errors || errorDefault,
      } as DataServiceError;
    }
  }

  // filter by country
  async getProjectOptions(params: { country: string }) {
    try {
      const resData: DataServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/ecocupid/project-of-country`,
        { params },
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

  subscribeEmail = (payload: { email: string }) => {
    return axios({
      url: `${ECOCUPID_ENDPOINTS.ApiPrefix}/ecocupid/subcribes`,
      method: 'POST',
      data: payload,
    });
  };

  async getIntroVideo() {
    try {
      const resData: DataServiceSuccess = await axios.get(
        `${ECOCUPID_ENDPOINTS.ApiPrefix}/ecocupid/intro-video`,
      );

      return {
        success: resData.success,
        data: {
          ...resData.data,
        },
      };
    } catch (error) {
      return {
        success: false,
        errors: error.errors || errorDefault,
      };
    }
  }
}

export const postsService = new PostsService();
