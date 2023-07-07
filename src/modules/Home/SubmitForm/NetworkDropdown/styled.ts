import styled from "styled-components";
import px2rem from "@/utils/px2rem";

export const Container = styled.div``;

export const Element = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(12)};

  .icon {
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }
`;

export const DropdownList = styled.div`
  display: grid;
  gap: ${px2rem(24)} !important;
`;

export const DropdownItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${px2rem(16)};
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${px2rem(12)};
    .icon {
      width: 28px;
      height: 28px;
      border-radius: 14px;
    }
  }
`;
