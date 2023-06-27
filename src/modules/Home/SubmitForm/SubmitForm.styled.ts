import px2rem from "@/utils/px2rem";
import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${px2rem(24)};

  .confirm-btn {
    margin-top: ${px2rem(24)};
  }

  .claimer {
    line-height: ${px2rem(28)};
  }
  
  .custom-text {
    text-decoration: underline;
    color: #B1E3FF;
    cursor: pointer;
  }
  
  .list-inputs {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(16)};
  }
`;
