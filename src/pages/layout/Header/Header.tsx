import { Row } from "@/components/Row";
import { ROUTE_PATH } from "@/constants/route-path";
import { HEADER_ID } from "@/pages/layout";
import React from "react";
import { Link } from "react-router-dom";
import { Wrapper } from "./Header.styled";
import Text from "@/components/Text";
import { CDN_URL_ICONS } from "@/configs";

const Header = () => {
  return (
    <Wrapper id={HEADER_ID}>
      <Row gap="60px">
        <Link className="text-logo" to={ROUTE_PATH.HOME}>
          <Row gap="16px">
            <img
              className="logo"
              alt="logo"
              src={`${CDN_URL_ICONS}/logo.svg`}
            />
            <Text color="white" size="h5">
              TC gas station
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
