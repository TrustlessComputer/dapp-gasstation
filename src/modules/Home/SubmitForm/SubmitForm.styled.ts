import px2rem from "@/utils/px2rem";
import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${px2rem(24)};

  .confirm-btn {
    margin-top: ${px2rem(32)};
  }

  .claimer {
    line-height: ${px2rem(28)};
  }
`;
