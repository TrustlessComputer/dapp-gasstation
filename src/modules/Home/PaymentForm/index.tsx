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
      <Text size="h6" fontWeight="regular">
        Send <strong>{paymentInfo.paymentAmount} {paymentInfo.paymentCurrency}</strong> to this payment address
      </Text>
      <div className="wrap-qr">
        <QRCodeGenerator
          bgColor="#FFFFFF"
          size={200}
          value={paymentInfo.paymentAddress || ""}
        />
      </div>

      <div className="expire-info">
        <div className="copy-container">
          <Text color="text-third" size="note" fontWeight={"medium"}>
            {paymentInfo.paymentAddress || ""}
          </Text>
          <IconSVG
            src={`${CDN_URL_ICONS}/ic-copy.svg`}
            maxWidth="24"
            onClick={() => onClickCopy(paymentInfo.paymentAddress || "")}
            className="icon-copy"
          />
        </div>
        <Text className="mt-12" size="body" fontWeight={"regular"}>
          Expires at: {formatDateTime({ dateTime: paymentInfo.expiredAt })}
        </Text>
      </div>

      <div className={"receive-address-list"}>
        {
          paymentInfo?.details?.map((detail: any) => {
            return (
              <div className="wrap-receive-address">
                <Text color="text-five" size="note">
                  Receiving {detail.currency} wallet address: <br></br> <strong>{detail.receiverAddress || ""}</strong>
                </Text>
                <Text color="text-five" size="note">
                  Amount: <br></br> <strong>{detail.amount || "0"} {detail.currency}</strong>
                </Text>
              </div>
            )
          })
        }
      </div>
    </Container>
  );
};

export default PaymentForm;
