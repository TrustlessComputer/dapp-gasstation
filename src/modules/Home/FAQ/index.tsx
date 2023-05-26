import React from "react";
import { Accordion } from "react-bootstrap";
import Text from "@/components/Text";
import { Container } from "./FAQ.styled";

const faqs = [
  {
    title: "Is there a limit to the number of $TC that a wallet can purchase?",
    desc: "The maximum amount allowed is 100 $TC per wallet.",
  },
  {
    title: "What currencies can be used to buy $TC?",
    desc: "BTC and ETH.",
  },
  {
    title: "What is the price of $TC?",
    desc: "The $TC price is set at 1 $TC = 0.0069 ETH.",
  },
  {
    title: "How much TC is required?",
    desc: "0.1 TC should be sufficient for about 10 swaps. The gas of creating Artifacts or deploying smart contracts is determined by the size of your file.",
  },
  {
    title: "Where can I trade $TC?",
    desc: "$TC cannot be sold at the moment.",
  },
];

export const FAQ = (): JSX.Element => {
  return (
    <Container id={"faqs"}>
      <Text className={`title mb-48`} size="h4" color={"white"}>
        FAQ
      </Text>

      <Accordion className="accordion" defaultActiveKey={["0"]} alwaysOpen>
        {faqs.map((faq, index) => (
          <Accordion.Item eventKey={index.toString()} className={"faqItem"}>
            <Accordion.Header className="header">
              <Text size={"h5"} fontWeight={"medium"}>
                {faq.title}
              </Text>
            </Accordion.Header>
            <Accordion.Body className="body">
              <Text size={"body-large"} color={"text-four"}>
                {faq.desc}
              </Text>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};
