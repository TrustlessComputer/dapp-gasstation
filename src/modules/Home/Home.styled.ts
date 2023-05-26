import px2rem from "@/utils/px2rem";
import styled from "styled-components";

export const Styled = styled.div`
  margin-top: ${px2rem(32)};
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: ${px2rem(800)};
  padding: ${px2rem(32)};
`;
