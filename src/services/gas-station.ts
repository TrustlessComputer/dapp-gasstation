import {
  IGenerateBuyTcAddressPayload,
  IGenerateBuyTcAddressResp,
  IHistoryBuyTcResp,
} from "@/interfaces/gas-station";
import { camelCaseKeys } from "@/utils";
import { apiClient } from ".";
import {swrFetcher} from "@/utils/swr";
import {API_EXCHANGE_URL} from "@/configs";

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

export const getPackageList = async (
) => {
  return swrFetcher(`${API_EXCHANGE_URL}/package/list`, {
    method: 'GET',
    error: 'getPackageList',
  });
};