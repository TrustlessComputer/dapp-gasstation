import Text from "@/components/Text";
import {IGenerateBuyTcAddressResp} from "@/interfaces/gas-station";
import {MDContainer} from "@/modules/styled";
import {makePackageOrder} from "@/services/gas-station";
import {getErrorMessage} from "@/utils/error";
import React, {useCallback, useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {FAQ} from "./FAQ";
import {Container, Styled} from "./Home.styled";
import PaymentForm from "./PaymentForm";
import SubmitForm, {IPackage} from "./SubmitForm";

declare global {
  interface Window {
    grecaptcha?: any;
  }
}

const siteKey = "6LevQD8mAAAAAEMxH0hhtwfP7dT1yuCXa1Ox3M1i";

const Home = () => {
  const [paymentInfo, setPaymentInfo] = useState<
    IGenerateBuyTcAddressResp | undefined
  >();

  const [token, setToken] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const onVerify = useCallback((token: string) => {
    setToken(token);
  }, []);

  const handleLoaded = () => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(siteKey, { action: "homepage" })
        .then((token: string) => {
          onVerify(token);
        });
    });
  };

  const addCapcha = () => {
    // Add reCaptcha
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.addEventListener("load", handleLoaded);
    document.body.appendChild(script);
    return () => {
      const script = document.createElement("script");
      document.body.removeChild(script);
    };
  };

  useEffect(() => {
    addCapcha();
    const intervalID = setInterval(addCapcha, 100 * 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const onSubmitGenerate = async (
    payload: any
  ) => {
    console.log('onSubmitGenerate', payload);
    const {
      toAddress,
      toBTCAddress,
      amountTC,
      amountBTC,
      amountWBTC,
      payType,
      isCustomPackage,
      selectedPackage,
      customPackage
    } = payload;
    try {
      setIsProcessing(true);
      const pkg: IPackage = isCustomPackage ? customPackage : selectedPackage;

      const data: any = {
        package_id: pkg?.id,
        address: '',
        payment_currency: payType?.toUpperCase(),
        receiver_addresses: {
          TC: toAddress,
          BTC: toBTCAddress,
          WBTC: toAddress,
        },
        is_custom: isCustomPackage,
        custom_detail: {
          TC: amountTC.toString(),
          BTC: amountBTC.toString(),
          WBTC: amountWBTC.toString(),
        }
      };

      console.log('data', data);
      const res = await makePackageOrder(data);

      setPaymentInfo(res);
    } catch (err) {
      const { message } = getErrorMessage(err);
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <MDContainer>
      <Styled>
        <Text size="h2" fontWeight={"medium"}>Get TC</Text>
        <Container>
          {paymentInfo ? (
            <PaymentForm
              paymentInfo={paymentInfo}
              onClickBuyMore={() => setPaymentInfo(undefined)}
            />
          ) : (
            <SubmitForm
              isProcessing={isProcessing}
              onSubmitGenerate={onSubmitGenerate}
            />
          )}

          <FAQ />
        </Container>
      </Styled>
    </MDContainer>
  );
};

export default Home;
