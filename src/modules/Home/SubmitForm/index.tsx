import Button from "@/components/Button";
import { Input } from "@/components/Inputs";
import { validateWalletAddress } from "@/utils";
import { Formik } from "formik";
import React, { useState } from "react";
import PaytypeDropdown, { PayType } from "../PaymentForm/PaytypeDropdown";
import { FormContainer } from "./SubmitForm.styled";
import Text from "@/components/Text";
import { ceilPrecised } from "@/utils/format";

interface IFormValue {
  amount: string;
  toAddress: string;
}

interface SubmitFormProps {
  isProcessing: boolean;
  onSubmitGenerate: (
    tcAddress: string,
    tcAmount: number,
    payType: PayType
  ) => void;
}

const TC_ETH_PRICE = 0.0069;
const TC_BTC_PRICE = 0.000472167;

const SubmitForm = (props: SubmitFormProps) => {
  const { isProcessing, onSubmitGenerate } = props;
  const [payType, setPayType] = useState(PayType.eth);

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.toAddress) {
      errors.toAddress = "Receiving TC wallet address is required.";
    } else if (!validateWalletAddress(values.toAddress)) {
      errors.toAddress = "Invalid receiving TC wallet address.";
    }

    if (!values.amount) {
      errors.amount = "Amount is required.";
    } else if (Number(values.amount) < 0.01 || Number(values.amount) > 100) {
      errors.amount =
        "The minimum amount is 0.01 TC. The maximum amount is 100 TC.";
    }

    return errors;
  };

  const handleSubmit = async (payload: IFormValue): Promise<void> => {
    onSubmitGenerate(payload.toAddress, Number(payload.amount), payType);
  };

  return (
    <Formik
      key="buy"
      initialValues={{
        toAddress: "",
        amount: "",
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
            title="Receiving TC Wallet Address"
            id="toAddress"
            type="text"
            name="toAddress"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.toAddress}
            className="input"
            placeholder={`Paste your TC wallet address here (0x1234...2345).`}
            errorMsg={
              errors.toAddress && touched.toAddress
                ? errors.toAddress
                : undefined
            }
          />

          <Input
            title={`Amount ${
              values.amount &&
              !errors.amount &&
              `( ~${
                payType === PayType.eth
                  ? `${ceilPrecised(
                      Number(values.amount) * TC_ETH_PRICE,
                      4
                    )} ETH`
                  : `${ceilPrecised(
                      Number(values.amount) * TC_BTC_PRICE,
                      5
                    )} BTC`
              } )`
            }`}
            id="amount"
            type="number"
            name="amount"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.amount}
            className="input"
            placeholder={`Amount`}
            errorMsg={
              errors.amount && touched.amount ? errors.amount : undefined
            }
          />

          <PaytypeDropdown payType={payType} setPayType={setPayType} />

          <Button
            isLoading={isProcessing}
            disabled={isProcessing}
            type="submit"
            className="confirm-btn"
          >
            {isProcessing ? "Processing..." : "Get TC"}
          </Button>

          <Text className="claimer">
            <span style={{ fontWeight: "700" }}>Disclaimer:</span> TC is sold
            only for users to pay gas fees to use the utilities of dapps on TC
            network (including but not limited to bridging, swapping, creating
            artifacts, issuing BRC-20 tokens, issuing BRC-721 NFTs, deploying
            smart contracts, and preserving files), NOT to raise funds. Each
            wallet is capped at 100 TC. And lastly, US citizens are prohibited
            from purchasing TC at this time.
          </Text>
        </FormContainer>
      )}
    </Formik>
  );
};

export default SubmitForm;
