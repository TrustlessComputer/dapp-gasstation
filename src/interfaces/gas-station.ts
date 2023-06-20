export interface IGenerateBuyTcAddressPayload {
  tcAddress: string;
  payType: string;
  tcAmount: number;
  "g-recaptcha-response": string;
}

export interface IGenerateBuyTcAddressResp {
  tcAddress: string;
  paymentAddress: string;
  paymentAmount: string;
  paymentCurrency: string;
  expiredAt: string;
  payType: string;
  details: [];
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
