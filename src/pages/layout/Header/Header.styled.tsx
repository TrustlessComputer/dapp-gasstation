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
  height: ${px2rem(110)};

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
        color: ${({ theme }) => theme.white} !important;
      }
    }
  }

  ${MediaQueryBuilder("lg", MediaLarge)}
  ${MediaQueryBuilder("xxl", MediaXl)}
`;

export { Wrapper };
