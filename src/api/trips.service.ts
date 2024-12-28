import { AxiosInstance } from "axios";
import { TtripsDto } from "../types/trips";

type TtripsService = {
  findAll: (keyword?: string) => Promise<TtripsDto[]>;
  findById: (id: string) => Promise<TtripsDto[]>;
  findByTag: (tag: string) => Promise<TtripsDto[]>;
};

const TripsService = (axiosInstance: AxiosInstance): TtripsService => {
  const urlTrips = `api/trips`;
  return {
    findAll: async (keyword) => {
      const response = await axiosInstance.get(`${urlTrips}`, {
        params: { keyword: keyword },
      });
      return response.data || [];
    },
    findById: async (id) => {
      const response = await axiosInstance.get(`${urlTrips}/${id}`);
      return response.data || [];
    },
    findByTag: async (tag) => {
      const response = await axiosInstance.get(`${urlTrips}/tag/${tag}`);
      return response.data || [];
    },
    
  };
};

export default TripsService;
