export interface IGenerateBuyTcAddressPayload {
  tcAddress: string;
  payType: string;
  tcAmount: number;
  "g-recaptcha-response": string;
}

export interface IGenerateBuyTcAddressResp {
  tcAddress: string;
  address: string;
  paymentAmount: string;
  expiredAt: string;
  payType: string;
}

export interface IHistoryBuyTcResp {
  id: string;
  tcAddress: string;
  payType: string;
  paymentAmount: string;
  receiveAddress: string;
  tcAmount: string;
  txTcProcessBuy: string;
  txBtcProcessBuy: string;
  status: number;
  statusStr: string;
  expiredAt: string;
  createdAt: string;
  isConfirmed: boolean;
}
