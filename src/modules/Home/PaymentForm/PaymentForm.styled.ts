import px2rem from "@/utils/px2rem";
import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${px2rem(24)};
`;
