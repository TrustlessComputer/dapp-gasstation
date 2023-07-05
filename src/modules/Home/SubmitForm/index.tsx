import Button from "@/components/Button";
import { Input } from "@/components/Inputs";
import {compareString, validateBTCAddressTaproot, validateWalletAddress} from "@/utils";
import { Formik } from "formik";
import React, {useEffect, useMemo, useState} from "react";
import { FormContainer } from "./SubmitForm.styled";
import Text from "@/components/Text";
import { ceilPrecised } from "@/utils/format";
import PackageList from "@/modules/Home/PackageList";
import {getPackageList} from "@/services/gas-station";
import px2rem from "@/utils/px2rem";
import PaytypeList, {IPayType, ListPayType} from "../PaymentForm/PaytypeList";
import {useAppSelector} from "@/state/hooks";
import {selectApplication} from "@/state/application/reducer";
import {L2_CHAIN_INFO} from "@/constants/chains";

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
  const [payType, setPayType] = useState<IPayType>();
  const [isCustomPackage, setIsCustomPackage] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<IPackage>();
  const [packages, setPackages] = useState<IPackage[]>([]);
  const [customPackage, setCustomPackage] = useState<IPackage>();
  const currentChain = useAppSelector(selectApplication).currentChain || L2_CHAIN_INFO;

  // console.log('account', account);
  // console.log('packages', packages);
  // console.log('errors', errors);
  // console.log('values', values);
  // console.log('touched', touched);
  // console.log('====');

  useEffect(() => {
    getListPackages();
  }, [currentChain?.chain]);

  const isL2 = useMemo(() => {
    return compareString(currentChain?.chain, L2_CHAIN_INFO.chain);
  }, [currentChain?.chain]);

  const getListPackages = async () => {
    const res = await getPackageList({network: currentChain.chain});

    const custom = res?.pop();
    setCustomPackage(custom);
    setFieldValue('customPackage', custom);

    setPackages(res);
    setSelectedPackage(res[1]);

    // if(res?.length > 0) {
    //   const silverPack = res[0];
    //   const goldPack = res[1];
    //   const diamondPack = res[2];
    //
    //   setPackages([silverPack, diamondPack, goldPack]);
    //
    //   setSelectedPackage(diamondPack);
    // }
  }

  useEffect(() => {
    setFieldValue('isCustomPackage', isCustomPackage, true);
  }, [isCustomPackage]);

  useEffect(() => {
    setFieldValue('payType', payType, true);
  }, [JSON.stringify(payType)]);

  useEffect(() => {
    if(selectedPackage) {
      console.log('selectedPackage', selectedPackage);
      const TCDetail = selectedPackage?.details?.find(d => d.currency === 'TC');
      if(TCDetail) {
        // @ts-ignore
        setFieldValue('amountTC', TCDetail?.amount || "0", true);
      }

      const BTCDetail = selectedPackage?.details?.find(d => d.currency === 'BTC');
      if(BTCDetail) {
        // @ts-ignore
        setFieldValue('amountBTC', BTCDetail?.amount || "0", true);
      }

      const WBTCDetail = selectedPackage?.details?.find(d => d.currency === 'WBTC');
      if(WBTCDetail) {
        // @ts-ignore
        setFieldValue('amountWBTC', WBTCDetail?.amount || "0", true);
      }

      setFieldValue('selectedPackage', selectedPackage, true);
    }
  }, [JSON.stringify(selectedPackage)]);

  const handleSelectPackage = (p: any) => {
    setSelectedPackage(p);
  }

  const handleSelectPaytype = (pt: any) => {
    setPayType(pt);
  }

  // @ts-ignore
  return (
    <FormContainer onSubmit={handleSubmit}>
      <PaytypeList data={ListPayType} onSelect={handleSelectPaytype} />
      <div>
        <div style={{
          display: "flex",
          justifyContent: 'space-between',
          alignItems: "center",
          marginTop: `${px2rem(8)}`,
          marginBottom: `${px2rem(16)}`
        }}>
          {
            !isCustomPackage && (
              <Text
                style={{ textTransform: "uppercase" }}
                size="tini"
                fontWeight="medium"
                color="text-secondary"
              >
                Packages
              </Text>
            )
          }
          <Text
            size={"tini"}
            fontWeight={"regular"}
            className={"custom-text"}
            onClick={() => setIsCustomPackage(!isCustomPackage)}
          >{isCustomPackage ? 'Buying packs' : 'Custom amount'}</Text>
        </div>
        {!isCustomPackage && <PackageList value={selectedPackage} data={packages} onSelect={handleSelectPackage}/>}
        <div style={{display: "flex", justifyContent: 'space-between', alignItems: "center", marginTop: `${px2rem(18)}`}}>
          <Text>Fee:</Text>
          <Text>{selectedPackage?.fee} USD</Text>
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
              title={"How many TC would you like to receive?"}
              // id="amount"
              type="number"
              name="amountTC"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.amountTC}
              className="input"
              placeholder={`Amount`}
              errorMsg={
                errors.amountTC && touched.amountTC ? errors.amountTC : undefined
              }
            />
            {
              !isL2 && selectedPackage?.id && selectedPackage?.id > 1 && (
                <Input
                  title={"How many BTC would you like to receive?"}
                  // id="amount"
                  type="number"
                  name="amountBTC"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.amountBTC}
                  className="input"
                  placeholder={`Amount`}
                  errorMsg={
                    errors.amountBTC && touched.amountBTC ? errors.amountBTC : undefined
                  }
                />
              )
            }
            {
              ((!isL2 && selectedPackage?.id && selectedPackage?.id > 2) || (isL2 && selectedPackage?.id && selectedPackage?.id > 5)) && (
                <Input
                  title={"How many WBTC would you like to receive?"}
                  // id="amount"
                  type="number"
                  name="amountWBTC"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.amountWBTC}
                  className="input"
                  placeholder={`Amount`}
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
        !isL2 && selectedPackage?.id && selectedPackage?.id > 1 && (
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
        {isProcessing ? "Processing..." : `Get ${selectedPackage?.id && selectedPackage?.id > 1 ? 'them' : 'it'} TC`}
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
  const currentChain = useAppSelector(selectApplication).currentChain || L2_CHAIN_INFO;

  const isL2 = useMemo(() => {
    return compareString(currentChain?.chain, L2_CHAIN_INFO.chain);
  }, [currentChain?.chain]);

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    console.log('validateForm', values);

    if (!values.toAddress) {
      errors.toAddress = "Receiving TC wallet address is required.";
    } else if (!validateWalletAddress(values.toAddress)) {
      errors.toAddress = "Invalid receiving TC wallet address.";
    }

    if(!isL2 && values?.selectedPackage?.id && values?.selectedPackage?.id > 1) {
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

      if(!isL2 && values?.selectedPackage?.id && values?.selectedPackage?.id > 1) {
        if (!values.amountBTC) {
          errors.amountBTC = "Amount is required.";
        } else if (Number(values.amountBTC) < 0.001 || Number(values.amountBTC) > 1) {
          errors.amountBTC =
            "The minimum amount is 0.001 BTC. The maximum amount is 1 BTC.";
        }
      }

      if((!isL2 && values?.selectedPackage?.id && values?.selectedPackage?.id > 2)
        || (isL2 && values?.selectedPackage?.id && values?.selectedPackage?.id > 5)
      ) {
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
