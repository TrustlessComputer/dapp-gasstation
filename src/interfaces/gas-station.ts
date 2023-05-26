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
