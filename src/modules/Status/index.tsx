import { MDContainer } from "@/modules/styled";
import React from "react";
import { Styled } from "./Status.styled";
import StatusForm from "./StatusForm";

const Status = () => {
  return (
    <MDContainer>
      <Styled>
        <StatusForm />
      </Styled>
    </MDContainer>
  );
};

export default Status;
