import { IGenerateBuyTcAddressResp } from "@/interfaces/gas-station";
import { formatBTCPrice, formatEthPrice } from "@/utils/format";
import React from "react";
import Text from "@/components/Text";
import { PayType } from "./PaytypeDropdown";
import { Container } from "./PaymentForm.styled";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { formatDateTime } from "@/utils/time";
import Button from "@/components/Button";

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

  return (
    <Container>
      <Text size="h6" fontWeight="medium">
        Send <span>{formatAmount} </span> to this payment address
      </Text>
      <QRCodeGenerator size={256} value={paymentInfo.address || ""} />

      <Text size="body-large">
        Expires at: {formatDateTime({ dateTime: paymentInfo.expiredAt })}
      </Text>

      <Text size="body-large">
        Receiver address: {paymentInfo.tcAddress || ""}
      </Text>

      <Button onClick={onClickBuyMore}>Buy more</Button>
    </Container>
  );
};

export default PaymentForm;
