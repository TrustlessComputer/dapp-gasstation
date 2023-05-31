import Button from "@/components/Button";
import { Input } from "@/components/Inputs";
import { validateWalletAddress } from "@/utils";
import { Formik } from "formik";
import React, { useState } from "react";
import { Container, FormContainer } from "./StatusForm.styled";
import Text from "@/components/Text";
import { IHistoryBuyTcResp } from "@/interfaces/gas-station";
import { getHistoryBuyTC } from "@/services/gas-station";
import Table from "@/components/Table";
import { formatTCPrice } from "@/utils/format";
import { formatDateTime } from "@/utils/time";

const TABLE_HEADINGS = ["Transaction", "Amount", "Time", "Status"];

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
      const data = await getHistoryBuyTC(payload.address);
      setHistories(data);
    } catch (error) {
    } finally {
      setIsProcessing(false);
    }
  };

  const historyDatas = histories.map((history) => {
    const tx = history.txBtcProcessBuy || "-";
    return {
      id: `${history.id}`,
      render: {
        transaction: (
          <a
            href={history.txBtcProcessBuy || undefined}
            className="transaction"
            rel="rel=”noopener noreferrer”"
            target="_blank"
          >
            {tx}
          </a>
        ),
        amount: (
          <Text color="text-primary" size="body" fontWeight="semibold">
            {history.tcAmount ? formatTCPrice(history.tcAmount) + " TC" : "-"}
          </Text>
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
            {history.statusStr || "-"}
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
