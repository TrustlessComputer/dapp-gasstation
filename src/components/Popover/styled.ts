import styled from "styled-components";
import { Popover, OverlayTrigger } from "react-bootstrap";
import px2rem from "@/utils/px2rem";

const PopoverWrapper = styled(Popover)<{ width?: number }>`
  background-color: ${({ theme }) => theme.bg.secondary};
  border: 1px solid ${({ theme }) => theme["border-third"]};
  max-width: ${({ width }) => px2rem(width || 200)} !important;
  border-radius: ${px2rem(8)};
  padding: ${px2rem(12)} ${px2rem(16)};
  /* margin-top: ${px2rem(6)}; */

  mix-blend-mode: normal;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);

  &.popover {
    .popover-arrow {
      width: 100%;
      transform: translate(0px, 0px) !important;
      background: transparent !important;
    }

    .popover-arrow::after {
      width: 100%;
      border-bottom-color: transparent !important;
      background: transparent !important;
    }
    .popover-arrow::before {
      width: 100%;
      border-bottom-color: transparent !important;
      background: transparent !important;
    }
  }
`;

const OverlayWrapper = styled(OverlayTrigger)``;

const Wrapper = styled.div<{ show?: boolean }>`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;

  background: ${({ theme }) => theme.bg.secondary};
  border: 1px solid ${({ theme }) => theme["border-third"]};
  padding: ${px2rem(0)} ${px2rem(12)};
  border-radius: ${px2rem(8)};
  height: ${px2rem(48)};
  cursor: pointer;

  :hover {
    border: 1px solid ${({ theme }) => theme["border-secondary"]};
  }

  .element-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .element {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${px2rem(12)};
    /* p {
      color: ${({ theme, show }) =>
      show ? theme["text-parallel"] : theme["text-highlight"]};
    } */
  }

  .fa-arrow-down {
    transform: rotate(0deg);
    transition: transform 200ms ease-in-out;
  }

  .fa-arrow-open {
    transform: rotate(-180deg);
    transition: transform 200ms ease-in-out;
  }

  :hover {
    opacity: ${({ show }) => (show ? 1 : 0.8)};
  }
`;

export { PopoverWrapper, OverlayWrapper, Wrapper };
