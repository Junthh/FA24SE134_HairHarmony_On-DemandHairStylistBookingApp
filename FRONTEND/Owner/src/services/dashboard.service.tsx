import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';

class DashboardServices {
  async listTotalRevenueByMonth(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/Bookings/TotalRevenueByMonth`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async listCountByStatus(params = {}) {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/Bookings/CountByStatus`, {
        params,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  }
  async listCountCustomer() {
    try {
      const resData = await axios.get(`${ENDPOINTS.ApiPrefix}/Customers`);
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export const dashboardServices = new DashboardServices();
