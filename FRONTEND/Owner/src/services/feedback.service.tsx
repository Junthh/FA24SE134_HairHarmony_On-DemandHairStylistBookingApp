import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';
import { ListEmployeeSuccess } from '../models/EmployeeResponse.model';

class FeedbackServices {
  async list(params = {}) {
    try {
      const resData: ListEmployeeSuccess = await axios.get(`${ENDPOINTS.ApiPrefix}/Feedbacks`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const feedbackServices = new FeedbackServices();
