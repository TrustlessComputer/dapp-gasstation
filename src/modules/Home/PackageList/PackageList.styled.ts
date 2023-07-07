import styled from "styled-components";
import px2rem from "@/utils/px2rem";

export const PackageListStyled = styled.div<{ length: number }>`
  .package-content {
    display: grid;
    justify-items: center;
    grid-gap: ${px2rem(24)};
    grid-template-columns: ${({ length }) =>
      `repeat(${length}, minmax(0, 1fr))`};
  }
`;
