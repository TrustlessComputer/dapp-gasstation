import {
  IGenerateBuyTcAddressPayload,
  IGenerateBuyTcAddressResp,
  IHistoryBuyTcResp,
} from "@/interfaces/gas-station";
import { camelCaseKeys } from "@/utils";
import { apiClient } from ".";

const API_PATH = "";

export const generateBuyTcAddress = async (
  payload: IGenerateBuyTcAddressPayload
): Promise<IGenerateBuyTcAddressResp> => {
  try {
    const res = await apiClient.post(`${API_PATH}/generate-address`, payload);
    return Object(camelCaseKeys(res));
  } catch (err) {
    throw err;
  }
};

export const getHistoryBuyTC = async (
  address: string
): Promise<IHistoryBuyTcResp[]> => {
  try {
    const res = await apiClient.get(`${API_PATH}/history?address=${address}`);
    return Object(camelCaseKeys(res));
  } catch (err) {
    throw err;
  }
};
