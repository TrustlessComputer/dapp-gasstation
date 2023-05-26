import { IGenerateBuyTcAddressResp } from "@/interfaces/gas-station";
import { MDContainer } from "@/modules/styled";
import { generateBuyTcAddress } from "@/services/gas-station";
import { getErrorMessage } from "@/utils/error";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Container, Styled } from "./Home.styled";
import PaymentForm from "./PaymentForm";
import { PayType } from "./PaytypeDropdown";
import SubmitForm from "./SubmitForm";

declare global {
  interface Window {
    grecaptcha?: any;
  }
}

const siteKey = "6LdCf9slAAAAAC7QwMb5kAjAt9sdVYQxg3rpKbTG";

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
    tcAddress: string,
    tcAmount: number,
    payType: PayType
  ) => {
    try {
      setIsProcessing(true);
      const data = await generateBuyTcAddress({
        tcAddress,
        tcAmount,
        payType,
        "g-recaptcha-response": token,
      });
      setPaymentInfo(data);
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
        <Container>
          {paymentInfo ? (
            <PaymentForm paymentInfo={paymentInfo} />
          ) : (
            <SubmitForm
              isProcessing={isProcessing}
              onSubmitGenerate={onSubmitGenerate}
            />
          )}
        </Container>
      </Styled>
    </MDContainer>
  );
};

export default Home;
