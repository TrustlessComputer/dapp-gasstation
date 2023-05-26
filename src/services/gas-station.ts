import {
  IGenerateBuyTcAddressPayload,
  IGenerateBuyTcAddressResp,
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
