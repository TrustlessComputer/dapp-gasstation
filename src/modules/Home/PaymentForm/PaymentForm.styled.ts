import px2rem from "@/utils/px2rem";
import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${px2rem(24)};

  .wrap-qr {
    background-color: white;
    padding: ${px2rem(16)};
  }

  .expire-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .copy-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: ${px2rem(8)} ${px2rem(24)};
    gap: ${px2rem(10)};
    background: #f4f4f4;
    border-radius: ${px2rem(20)};

    .icon-copy {
      cursor: pointer;
      :hover {
        opacity: 0.8;
      }
    }
  }

  .wrap-receive-address {
    padding: ${px2rem(8)} ${px2rem(24)};

    background: #2e2e2e;
    border-radius: ${px2rem(20)};

    strong {
      color: #FFFFFF;
    }
  }
  
  .receive-address-list {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(12)};
  }
`;
