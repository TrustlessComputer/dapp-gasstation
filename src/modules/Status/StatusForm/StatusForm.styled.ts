import px2rem from "@/utils/px2rem";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    align-self: center;
    text-align: center;
  }

  .input {
    border-radius: ${px2rem(28)};
  }

  .table {
    margin-top: ${px2rem(24)};

    th:nth-child(2),
    td:nth-child(2),
    th:nth-child(3),
    td:nth-child(3),
    th:nth-child(4),
    td:nth-child(4),
    th:nth-child(5),
    td:nth-child(5),
    th:nth-child(6),
    td:nth-child(6) {
      text-align: right;
    }

    th:nth-child(1) {
      min-width: ${px2rem(100)};
      max-width: ${px2rem(220)};
    }
    td:nth-child(1) {
      min-width: ${px2rem(100)};
      max-width: ${px2rem(220)};
      color: ${({ theme }) => theme["text-primary"]};
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    th {
    }

    td {
      padding-top: ${px2rem(24)};
      padding-bottom: ${px2rem(24)};
      vertical-align: middle;
    }

    .transaction {
      font-weight: 500;
    }

    .depositAddress {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      gap: ${px2rem(6)};

      .icon-copy {
        cursor: pointer;
        :hover {
          opacity: 0.8;
        }
      }
    }

    .receive-amount-list {
      display: flex;
      flex-direction: column;
      gap: ${px2rem(4)};
    }
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${px2rem(16)};
  margin-top: ${px2rem(60)};

  .confirm-btn {
    //margin-top: ${px2rem(26)};
    height: ${px2rem(48)};
  }
`;
