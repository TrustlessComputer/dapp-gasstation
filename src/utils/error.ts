export const ERROR_CODE = {
  CONNECT_WALLET: "3000",
  EMPTY_USER: "-3001",
  FIND_CURRENT_ACCOUNT: "-3002",
};

export const ERROR_MESSAGE = {
  [ERROR_CODE.CONNECT_WALLET]: {
    message: "Can not connect wallet.",
    desc: "Can not connect wallet.",
  },
  [ERROR_CODE.EMPTY_USER]: {
    message: "Please reconnect wallet.",
    desc: "Please reconnect wallet.",
  },
  [ERROR_CODE.FIND_CURRENT_ACCOUNT]: {
    message: "Can not find current account by storage.",
    desc: "Can not find current account by storage.",
  },
};

class WError extends Error {
  message: string;
  code: string;
  desc: string;
  constructor(code: string, desc?: string) {
    super();
    const _error = ERROR_MESSAGE[code];
    this.message = `${_error.message} (${code})` || "";
    this.code = code;
    this.desc = desc || _error?.desc;
  }
  getMessage() {
    return this.message;
  }
}

export const getErrorMessage = (error: any) => {
  let message = "Something went wrong. Please try again later.";
  if (error && error.message) {
    message = error.message;
  }
  return {
    message: `${message}`,
  };
};

export default WError;
