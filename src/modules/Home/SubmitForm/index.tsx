import Button from "@/components/Button";
import { Input } from "@/components/Inputs";
import { validateWalletAddress } from "@/utils";
import { Formik } from "formik";
import React, {useEffect, useState} from "react";
import PaytypeDropdown, { PayType } from "../PaymentForm/PaytypeDropdown";
import { FormContainer } from "./SubmitForm.styled";
import Text from "@/components/Text";
import { ceilPrecised } from "@/utils/format";
import PackageList from "@/modules/Home/PackageList";

interface IFormValue {
  amountTC: string;
  amountBTC: string;
  amountWBTC: string;
  toAddress: string;
  isCustomPackage: boolean;
  selectedPackage?: IPackage;
  payType?: any;
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

export interface ICoin {
  name: string;
  amount: number;
}

export interface IPackage {
  id?: number;
  title?: string;
  coins?: ICoin[];
}

const PACKAGES: Array<IPackage> = [
  {
    id: 1,
    title: 'Package 1',
    coins: [
      {
        name: 'TC',
        amount: 100
      }
    ]
  },
  {
    id: 2,
    title: 'Package 2',
    coins: [
      {
        name: 'TC',
        amount: 100
      },
      {
        name: 'BTC',
        amount: 0.005
      },
    ]
  },
  {
    id: 3,
    title: 'Package 3',
    coins: [
      {
        name: 'TC',
        amount: 100
      },
      {
        name: 'BTC',
        amount: 0.005
      },
      {
        name: 'WBTC',
        amount: 0.005
      },
    ]
  },
];

const Form = (props: any) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  const { isProcessing, onSubmitGenerate } = props;
  const [payType, setPayType] = useState(PayType.eth);
  const [isCustomPackage, setIsCustomPackage] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<IPackage>(PACKAGES[0]);

  useEffect(() => {
    setFieldValue('isCustomPackage', isCustomPackage, true);
  }, [isCustomPackage]);

  useEffect(() => {
    setFieldValue('payType', payType, true);
  }, [JSON.stringify(payType)]);

  useEffect(() => {
    if(selectedPackage) {
      // @ts-ignore
      setFieldValue('amountTC', selectedPackage?.coins[0]?.amount || 0, true);
      // @ts-ignore
      setFieldValue('amountBTC', selectedPackage?.coins[1]?.amount || 0, true);
      // @ts-ignore
      setFieldValue('amountWBTC', selectedPackage?.coins[2]?.amount || 0, true);

      setFieldValue('selectedPackage', selectedPackage, true);
    }
  }, [JSON.stringify(selectedPackage)]);

  const handleSelectPackage = (p: any) => {
    setSelectedPackage(p);
  }

  // @ts-ignore
  // @ts-ignore
  return (
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

      <PaytypeDropdown payType={payType} setPayType={setPayType} />
      <div>
        <PackageList data={PACKAGES} onSelect={handleSelectPackage}/>
        <Text className={"custom-text"} onClick={() => setIsCustomPackage(!isCustomPackage)}>Custom</Text>
      </div>

      {
        isCustomPackage && (
          <div className={"list-inputs"}>
            <Input
              // title={`Amount ${
              //   values.amount && !errors.amount
              //     ? `( ~${
              //       payType === PayType.eth
              //         ? `${ceilPrecised(
              //           Number(values.amount) * TC_ETH_PRICE,
              //           4
              //         )} ETH`
              //         : `${ceilPrecised(
              //           Number(values.amount) * TC_BTC_PRICE,
              //           5
              //         )} BTC`
              //     } )`
              //     : ""
              // }`}
              title={"Amount TC"}
              // id="amount"
              type="number"
              name="amountTC"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.amountTC}
              className="input"
              placeholder={`Amount TC`}
              errorMsg={
                errors.amountTC && touched.amountTC ? errors.amountTC : undefined
              }
            />
            {
              selectedPackage?.id && selectedPackage?.id > 1 && (
                <Input
                  title={"Amount BTC"}
                  // id="amount"
                  type="number"
                  name="amountBTC"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.amountBTC}
                  className="input"
                  placeholder={`Amount BTC`}
                  errorMsg={
                    errors.amountBTC && touched.amountBTC ? errors.amountBTC : undefined
                  }
                />
              )
            }
            {
              selectedPackage?.id && selectedPackage?.id > 2 && (
                <Input
                  title={"Amount WBTC"}
                  // id="amount"
                  type="number"
                  name="amountWBTC"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.amountWBTC}
                  className="input"
                  placeholder={`Amount WBTC`}
                  errorMsg={
                    errors.amountWBTC && touched.amountWBTC ? errors.amountWBTC : undefined
                  }
                />
              )
            }
          </div>
        )
      }
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
  )
}

const SubmitForm = (props: SubmitFormProps) => {
  const { isProcessing, onSubmitGenerate } = props;
  // const [payType, setPayType] = useState(PayType.eth);
  // const [isCustomPackage, setIsCustomPackage] = useState(false);
  // const [selectedPackage, setSelectedPackage] = useState<IPackage>(PACKAGES[0]);
  //
  // useEffect(() => {
  //   if(selectedPackage) {
  //
  //   }
  // }, [JSON.stringify(selectedPackage)]);
  //
  // const handleSelectPackage = (p: any) => {
  //   setSelectedPackage(p);
  // }

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    console.log('validateForm', values);

    if (!values.toAddress) {
      errors.toAddress = "Receiving TC wallet address is required.";
    } else if (!validateWalletAddress(values.toAddress)) {
      errors.toAddress = "Invalid receiving TC wallet address.";
    }

    if(values?.isCustomPackage) {
      if (!values.amountTC) {
        errors.amountTC = "Amount is required.";
      } else if (Number(values.amountTC) < 0.01 || Number(values.amountTC) > 100) {
        errors.amountTC =
          "The minimum amount is 0.01 TC. The maximum amount is 100 TC.";
      }

      if(values?.selectedPackage?.id && values?.selectedPackage?.id > 1) {
        if (!values.amountBTC) {
          errors.amountBTC = "Amount is required.";
        } else if (Number(values.amountBTC) < 0.001 || Number(values.amountBTC) > 100) {
          errors.amountBTC =
            "The minimum amount is 0.001 BTC. The maximum amount is 1 BTC.";
        }
      }

      if(values?.selectedPackage?.id && values?.selectedPackage?.id > 2) {
        if (!values.amountWBTC) {
          errors.amountWBTC = "Amount is required.";
        } else if (Number(values.amountWBTC) < 0.001 || Number(values.amountWBTC) > 1) {
          errors.amountWBTC =
            "The minimum amount is 0.001 WBTC. The maximum amount is 1 WBTC.";
        }
      }

    }

    return errors;
  };

  const handleSubmit = async (payload: IFormValue): Promise<void> => {
    onSubmitGenerate(payload.toAddress, Number(payload.amountTC), payload.payType);
  };

  return (
    <Formik
      key="buy"
      initialValues={{
        toAddress: "",
        amountTC: "",
        amountBTC: "",
        amountWBTC: "",
        isCustomPackage: false
      }}
      validate={validateForm}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form {...props}/>
      )}
    </Formik>
  );
};

export default SubmitForm;
