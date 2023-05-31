import styled, { css } from "styled-components";
import { LayoutPadding } from "@/pages/layout/Layout.styled";
import px2rem from "@/utils/px2rem";
import { MediaQueryBuilder } from "@/theme";

const MediaLarge = css`
  .balance-wrapper {
    display: none;
  }
`;

const MediaXl = css`
  .external-wrapper {
    display: none;
  }
`;

const Wrapper = styled(LayoutPadding)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: ${({ theme }) => theme.bg.secondary};
  padding-top: ${px2rem(24)};
  padding-bottom: ${px2rem(24)};
  height: ${px2rem(80)};

  .ic-logo {
    width: ${px2rem(60)};
    height: ${px2rem(60)};
  }

  .text-logo {
    text-decoration: none !important;

    :hover {
      opacity: 0.8;
    }
  }

  .rightContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${px2rem(16)};
    position: relative;

    .external-link {
      display: flex;
      align-items: center;
      gap: ${px2rem(16)};
      margin-right: ${px2rem(24)};

      a {
        color: ${({ theme }) => theme["button-primary"]} !important;
      }
    }
  }

  ${MediaQueryBuilder("lg", MediaLarge)}
  ${MediaQueryBuilder("xxl", MediaXl)}
`;

const StyledTab = styled.div<{ isActive: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${px2rem(10)} ${px2rem(20)};

  border-bottom: 2px solid
    ${({ theme, isActive }) =>
      isActive ? theme["button-primary"] : "transparent"};

  color: ${({ theme }) => theme["button-primary"]};
  font-size: ${px2rem(16)};

  :hover {
    text-decoration: underline;
  }
`;

export { Wrapper, StyledTab };
