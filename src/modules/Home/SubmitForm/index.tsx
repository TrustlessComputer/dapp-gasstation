import Button from "@/components/Button";
import { Input } from "@/components/Inputs";
import { validateWalletAddress } from "@/utils";
import { Formik } from "formik";
import React, { useState } from "react";
import PaytypeDropdown, { PayType } from "../PaytypeDropdown";
import { FormContainer } from "./SubmitForm.styled";

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

const SubmitForm = (props: SubmitFormProps) => {
  const { isProcessing, onSubmitGenerate } = props;
  const [payType, setPayType] = useState(PayType.eth);

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.toAddress) {
      errors.toAddress = "Receiver TC wallet address is required.";
    } else if (!validateWalletAddress(values.toAddress)) {
      errors.toAddress = "Invalid receiver TC wallet address.";
    }

    if (!values.amount) {
      errors.amount = "Amount is required.";
    } else if (Number(values.amount) < 1 || Number(values.amount) > 100) {
      errors.amount = "Amount min 1 and max 100.";
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
            title="Receiver TC Wallet address"
            id="toAddress"
            type="text"
            name="toAddress"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.toAddress}
            className="input"
            placeholder={`Paste receiver TC wallet address here`}
            errorMsg={
              errors.toAddress && touched.toAddress
                ? errors.toAddress
                : undefined
            }
          />

          <Input
            title="Amount"
            id="amount"
            type="number"
            name="amount"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.amount}
            className="input"
            placeholder={`Amount TC`}
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
            {isProcessing ? "Processing..." : "Buy"}
          </Button>
        </FormContainer>
      )}
    </Formik>
  );
};

export default SubmitForm;
