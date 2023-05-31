import { Row } from "@/components/Row";
import { ROUTE_PATH } from "@/constants/route-path";
import { HEADER_ID } from "@/pages/layout";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { StyledTab, Wrapper } from "./Header.styled";
import { CDN_URL_ICONS } from "@/configs";

const Tabs = [
  {
    title: "HOME",
    path: "/",
  },
  {
    title: "CHECK STATUS",
    path: "/status",
  },
];

const Header = () => {
  const location = useLocation();

  const renderTabs = () => {
    return (
      <Row gap="12px">
        {Tabs.map((tap) => (
          <a href={tap.path}>
            <StyledTab isActive={location.pathname === tap.path}>
              {tap.title}
            </StyledTab>
          </a>
        ))}
      </Row>
    );
  };

  return (
    <Wrapper id={HEADER_ID}>
      <Row gap="40px">
        <Link className="text-logo" to={ROUTE_PATH.HOME}>
          <Row gap="16px">
            <img
              className="logo"
              alt="logo"
              src={`${CDN_URL_ICONS}/logo.svg`}
            />
          </Row>
        </Link>
        {renderTabs()}
      </Row>
      <div className="rightContainer">
        <div className="external-link">
          <a href={"https://trustless.computer/"} target="_blank">
            TRUSTLESS
          </a>
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;
