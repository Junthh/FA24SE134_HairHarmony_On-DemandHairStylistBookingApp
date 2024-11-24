import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';

class FeedbackService {
  async list(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/Feedbacks`, { params });
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const feedbackService = new FeedbackService();
