import Button from "@/components/Button";
import {Input} from "@/components/Inputs";
import {formatLongAddress, validateWalletAddress} from "@/utils";
import {Formik} from "formik";
import React, {useState} from "react";
import {Container, FormContainer} from "./StatusForm.styled";
import Text from "@/components/Text";
import {IHistoryBuyTcResp} from "@/interfaces/gas-station";
import {getHistoryMakeOrder} from "@/services/gas-station";
import Table from "@/components/Table";
import {formatDateTime} from "@/utils/time";
import IconSVG from "@/components/IconSVG";
import {CDN_URL_ICONS, MEMPOOL_URL, TC_EXPLORER} from "@/configs";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

const TABLE_HEADINGS = [
  // "Transaction",
  "Deposit amount",
  "Deposit address",
  "Amount",
  "Time",
  "Status",
];

interface IFormValue {
  address: string;
}
const StatusForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [histories, setHistories] = useState<IHistoryBuyTcResp[]>([]);

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.address) {
      errors.address = "TC wallet address is required.";
    } else if (!validateWalletAddress(values.address)) {
      errors.address = "Invalid TC wallet address.";
    }

    return errors;
  };

  const handleSubmit = async (payload: IFormValue): Promise<void> => {
    try {
      setIsProcessing(true);
      setHistories([]);
      // const data = await getHistoryBuyTC(payload.address);
      const data = await getHistoryMakeOrder({address: payload.address});
      setHistories(data.reverse());
    } catch (error) {
    } finally {
      setIsProcessing(false);
    }
  };

  const onClickCopy = (address: string) => {
    copy(address);
    toast.success("Copied");
  };

  const historyDatas = histories.map((history) => {
    const tx = history.txBtcProcessBuy || "-";

    return {
      id: `${history.id}`,
      render: {
        // transaction: (
        //   <a
        //     href={history.txBtcProcessBuy || undefined}
        //     className="transaction"
        //     rel="rel=”noopener noreferrer”"
        //     target="_blank"
        //   >
        //     {tx}
        //   </a>
        // ),

        depositAmount: (
          <div className="depositAddress" style={{justifyContent: 'flex-start'}}>
            <Text color="text-primary" size="body" fontWeight="semibold">
              {history?.paymentAmount} {" "}
              {history?.paymentCurrency}
            </Text>
            <IconSVG
              src={`${CDN_URL_ICONS}/ic-copy-white.svg`}
              maxWidth="20"
              onClick={() => onClickCopy(history?.paymentAmount)}
              className="icon-copy"
              color="white"
            />
          </div>
        ),
        depositAddress: (
          <div className="depositAddress">
            <Text color="text-primary" size="body">
              {formatLongAddress(history.paymentAddress)}
            </Text>
            <IconSVG
              src={`${CDN_URL_ICONS}/ic-copy-white.svg`}
              maxWidth="20"
              onClick={() => onClickCopy(history.paymentAddress)}
              className="icon-copy"
              color="white"
            />
          </div>
        ),
        amount: (
          <div className={"receive-amount-list"}>
            {
              history?.details?.map((detail: any) => {
                let url = `${TC_EXPLORER}/tx/${detail.txHash}`;
                if(detail.currency === 'BTC') {
                  url = `${MEMPOOL_URL}/tx/${detail.txHash}`;
                }
                return (
                  <Text color="text-primary" size="body" fontWeight="semibold">
                    {detail.amount} {detail.currency} {" "}
                    <img className="ic-copy" src={`${CDN_URL_ICONS}/ic-share-white.svg`} onClick={() => window.open(url, "_blank")} style={{width: '16px', marginTop: '-3px', cursor: 'pointer'}}/>
                  </Text>
                )
              })
            }
          </div>
        ),
        time: (
          <Text color="text-primary" size="body">
            {formatDateTime({
              dateTime: new Date(history.createdAt).getTime(),
            })}
          </Text>
        ),
        status: (
          <Text color="text-primary" size="body">
            {history.status || "-"}
          </Text>
        ),
      },
    };
  });

  return (
    <Container>
      <Text className="title" size="h2">
        Check status
      </Text>
      <Formik
        key="status"
        initialValues={{
          address: "",
        }}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <FormContainer onSubmit={handleSubmit}>
            <Input
              title="TC Wallet Address"
              id="address"
              type="text"
              name="address"
              classInputWrapper="input"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
              className="input"
              placeholder={`Paste your TC wallet address here (0x1234...2345).`}
              errorMsg={
                errors.address && touched.address ? errors.address : undefined
              }
              autoFocus
            />

            <Button
              isLoading={isProcessing}
              disabled={isProcessing}
              type="submit"
              className="confirm-btn"
            >
              {isProcessing ? "Checking..." : "Check"}
            </Button>
          </FormContainer>
        )}
      </Formik>

      <Table
        tableHead={TABLE_HEADINGS}
        data={historyDatas}
        className={"token-table"}
      />
    </Container>
  );
};

export default StatusForm;
