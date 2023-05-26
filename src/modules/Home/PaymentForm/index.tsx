import { IGenerateBuyTcAddressResp } from "@/interfaces/gas-station";
import { formatBTCPrice, formatEthPrice } from "@/utils/format";
import React from "react";
import Text from "@/components/Text";
import { PayType } from "./PaytypeDropdown";
import { Container } from "./PaymentForm.styled";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { formatDateTime } from "@/utils/time";
import Button from "@/components/Button";
import IconSVG from "@/components/IconSVG";
import { CDN_URL, CDN_URL_ICONS } from "@/configs";
import { Row } from "react-bootstrap";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

interface PaymentFormProps {
  paymentInfo: IGenerateBuyTcAddressResp;
  onClickBuyMore: () => void;
}

const PaymentForm = (props: PaymentFormProps) => {
  const { paymentInfo, onClickBuyMore } = props;

  const formatAmount =
    paymentInfo.payType === PayType.btc
      ? `${formatBTCPrice(paymentInfo.paymentAmount)} BTC`
      : `${formatEthPrice(paymentInfo.paymentAmount)} ETH`;

  const onClickCopy = (address: string) => {
    copy(address);
    toast.success("Copied");
  };

  return (
    <Container>
      <Text size="h6" fontWeight="medium">
        Send <span>{formatAmount} </span> to this payment address
      </Text>
      <div className="wrap-qr">
        <QRCodeGenerator
          bgColor="#FFFFFF"
          size={200}
          value={paymentInfo.address || ""}
        />
      </div>

      <div className="expire-info">
        <div className="copy-container">
          <Text color="text-third" size="body-large">
            {paymentInfo.address || ""}
          </Text>
          <IconSVG
            src={`${CDN_URL_ICONS}/ic-copy.svg`}
            maxWidth="24"
            onClick={onClickCopy}
            className="icon-copy"
          />
        </div>
        <Text className="mt-12" size="body-large">
          Expires at: {formatDateTime({ dateTime: paymentInfo.expiredAt })}
        </Text>
      </div>

      <div className="wrap-receive-address">
        <Text color="text-five" size="body-large">
          Receiver TC address: {paymentInfo.tcAddress || ""}
        </Text>
      </div>
    </Container>
  );
};

export default PaymentForm;
