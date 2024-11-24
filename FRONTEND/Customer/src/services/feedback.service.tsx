import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';
import { ListServiceSuccess } from 'models/ServiceResponse.model';

class FeedbackService {
  async create(body) {
    try {
      const resData = await axios.post(`${ENDPOINTS.ApiPrefix}/Feedbacks`, body);
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const feedbackService = new FeedbackService();
