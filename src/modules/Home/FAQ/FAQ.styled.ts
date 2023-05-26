import px2rem from "@/utils/px2rem";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: ${px2rem(800)};
  margin-top: ${px2rem(140)};

  .title {
    align-self: center;
    text-align: center;
  }

  .accordion {
    --bs-accordion-bg: transparent;
    --bs-accordion-color: transparent;
    --bs-accordion-inner-border-radius: 0;
    --bs-accordion-active-color: transparent;
    --bs-accordion-active-bg: transparent;
    --bs-accordion-border-color: transparent;
    --bs-accordion-btn-active-icon: url("https://cdn.trustless.computer/images/chevron-down.svg");
    --bs-accordion-btn-icon: url("https://cdn.trustless.computer/images/chevron-down.svg");
    --bs-accordion-btn-icon-width: 24px;
    --bs-accordion-btn-icon-height: 24px;
    --bs-accordion-btn-padding-x: 0px;
    --bs-accordion-body-padding-x: 0px;
    --bs-accordion-btn-padding-y: 0px;
    --bs-accordion-body-padding-y: 0px;
  }

  .faqItem {
    background-color: transparent;
    border-bottom: 1px solid ${({ theme }) => theme["border-third"]};
    width: 100%;

    margin-bottom: 24px;

    .header {
      margin-bottom: 24px;
    }

    .body {
      margin-bottom: 24px;
    }

    button:focus:not(:focus-visible) {
      box-shadow: none !important;
      outline: none !important;
    }
  }
`;
