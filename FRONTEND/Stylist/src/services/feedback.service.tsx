import axios from 'axios';
import { ECOCUPID_ENDPOINTS } from 'configurations/constants/globalConstants';

class FeedbackService {
  async list(params = {}) {
    try {
      const resData = await axios.get(`${ECOCUPID_ENDPOINTS.ApiPrefix}/Feedbacks`, { params });
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const feedbackService = new FeedbackService();
