import Button from "@/components/Button";
import { Input } from "@/components/Inputs";
import {validateBTCAddressTaproot, validateWalletAddress} from "@/utils";
import { Formik } from "formik";
import React, {useEffect, useState} from "react";
import PaytypeDropdown, { PayType } from "../PaymentForm/PaytypeDropdown";
import { FormContainer } from "./SubmitForm.styled";
import Text from "@/components/Text";
import { ceilPrecised } from "@/utils/format";
import PackageList from "@/modules/Home/PackageList";
import {getPackageList} from "@/services/gas-station";
import px2rem from "@/utils/px2rem";

interface IFormValue {
  amountTC: string;
  amountBTC: string;
  amountWBTC: string;
  toAddress: string;
  toBTCAddress: string;
  isCustomPackage: boolean;
  selectedPackage?: IPackage;
  payType?: any;
}

interface SubmitFormProps {
  isProcessing: boolean;
  onSubmitGenerate: (payload: any) => void;
}

const TC_ETH_PRICE = 0.0069;
const TC_BTC_PRICE = 0.000472167;

export interface ICoin {
  currency: string;
  amount: number;
  id: number;
}

export interface IPackage {
  id?: number;
  title?: string;
  details?: ICoin[];
  fee: string;
}

// const PACKAGES: Array<IPackage> = [
//   {
//     id: 1,
//     title: 'Package 1',
//     coins: [
//       {
//         currency: 'TC',
//         amount: 100
//       }
//     ]
//   },
//   {
//     id: 2,
//     title: 'Package 2',
//     coins: [
//       {
//         currency: 'TC',
//         amount: 100
//       },
//       {
//         currency: 'BTC',
//         amount: 0.005
//       },
//     ]
//   },
//   {
//     id: 3,
//     title: 'Package 3',
//     coins: [
//       {
//         currency: 'TC',
//         amount: 100
//       },
//       {
//         currency: 'BTC',
//         amount: 0.005
//       },
//       {
//         currency: 'WBTC',
//         amount: 0.005
//       },
//     ]
//   },
// ];

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

  const { isProcessing } = props;
  const [payType, setPayType] = useState(PayType.eth);
  const [isCustomPackage, setIsCustomPackage] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<IPackage>();
  const [packages, setPackages] = useState<IPackage[]>([]);
  const [customPackage, setCustomPackage] = useState<IPackage>();

  // console.log('account', account);
  // console.log('packages', packages);
  // console.log('errors', errors);
  // console.log('values', values);
  // console.log('touched', touched);
  // console.log('====');

  useEffect(() => {
    getListPackages();
  }, []);

  const getListPackages = async () => {
    const res = await getPackageList();

    const custom = res?.pop();
    setCustomPackage(custom);
    setFieldValue('customPackage', custom);

    setPackages(res);
    if(packages?.length > 1) {
      setSelectedPackage(packages[0]);
    }
  }

  useEffect(() => {
    setFieldValue('isCustomPackage', isCustomPackage, true);
  }, [isCustomPackage]);

  useEffect(() => {
    setFieldValue('payType', payType, true);
  }, [JSON.stringify(payType)]);

  useEffect(() => {
    if(selectedPackage) {
      // @ts-ignore
      setFieldValue('amountTC', selectedPackage?.details[0]?.amount || "0", true);
      // @ts-ignore
      setFieldValue('amountBTC', selectedPackage?.details[1]?.amount || "0", true);
      // @ts-ignore
      setFieldValue('amountWBTC', selectedPackage?.details[2]?.amount || "0", true);

      setFieldValue('selectedPackage', selectedPackage, true);
    }
  }, [JSON.stringify(selectedPackage)]);

  const handleSelectPackage = (p: any) => {
    setSelectedPackage(p);
  }

  // @ts-ignore
  return (
    <FormContainer onSubmit={handleSubmit}>
      <PaytypeDropdown payType={payType} setPayType={setPayType} />
      <div>
        <PackageList data={packages} onSelect={handleSelectPackage}/>
        <div style={{display: "flex", justifyContent: 'space-between', alignItems: "center", marginTop: `${px2rem(8)}`}}>
          <Text>Fee: {selectedPackage?.fee} USD</Text>
          <Text className={"custom-text"} onClick={() => setIsCustomPackage(!isCustomPackage)}>Custom amount</Text>
        </div>
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
      <Input
        title="Receiving TC Wallet Address"
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
      {
        selectedPackage?.id && selectedPackage?.id > 1 && (
          <Input
            title="Receiving BTC Wallet Address"
            type="text"
            name="toBTCAddress"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.toBTCAddress}
            className="input"
            placeholder={`Paste your BTC wallet address here.`}
            errorMsg={
              errors.toBTCAddress && touched.toBTCAddress
                ? errors.toBTCAddress
                : undefined
            }
          />
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

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    console.log('validateForm', values);

    if (!values.toAddress) {
      errors.toAddress = "Receiving TC wallet address is required.";
    } else if (!validateWalletAddress(values.toAddress)) {
      errors.toAddress = "Invalid receiving TC wallet address.";
    }

    if(values?.selectedPackage?.id && values?.selectedPackage?.id > 1) {
      if (!values.toBTCAddress) {
        errors.toBTCAddress = "Receiving BTC wallet address is required.";
      } else if (!validateBTCAddressTaproot(values.toBTCAddress)) {
        errors.toBTCAddress = "Invalid receiving BTC wallet address.";
      }
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
        } else if (Number(values.amountBTC) < 0.0004 || Number(values.amountBTC) > 1) {
          errors.amountBTC =
            "The minimum amount is 0.0004 BTC. The maximum amount is 1 BTC.";
        }
      }

      if(values?.selectedPackage?.id && values?.selectedPackage?.id > 2) {
        if (!values.amountWBTC) {
          errors.amountWBTC = "Amount is required.";
        } else if (Number(values.amountWBTC) < 0.0004 || Number(values.amountWBTC) > 1) {
          errors.amountWBTC =
            "The minimum amount is 0.0004 WBTC. The maximum amount is 1 WBTC.";
        }
      }

    }

    return errors;
  };

  const handleSubmit = async (payload: IFormValue): Promise<void> => {
    onSubmitGenerate(payload);
  };

  return (
    <Formik
      key="buy"
      initialValues={{
        toAddress: "",
        toBTCAddress: "",
        amountTC: "",
        amountBTC: "",
        amountWBTC: "",
        isCustomPackage: false
      }}
      validate={validateForm}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form isProcessing={isProcessing} {...props}/>
      )}
    </Formik>
  );
};

export default SubmitForm;
