import { Row } from "@/components/Row";
import { ROUTE_PATH } from "@/constants/route-path";
import { HEADER_ID } from "@/pages/layout";
import React from "react";
import { Link } from "react-router-dom";
import { Wrapper } from "./Header.styled";
import Text from "@/components/Text";

const Header = () => {
  return (
    <Wrapper id={HEADER_ID}>
      <Row gap="60px">
        <Link className="text-logo" to={ROUTE_PATH.HOME}>
          <Row gap="16px">
            <Text color="white" size="h4">
              Gas station
            </Text>
          </Row>
        </Link>
      </Row>
      <div className="rightContainer">
        <div className="external-link">
          <a href={"https://trustless.computer/"} target="_blank">
            Trustless
          </a>
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;
