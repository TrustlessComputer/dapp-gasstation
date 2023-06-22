import styled from "styled-components";
import px2rem from "@/utils/px2rem";
import IconSVG from "@/components/IconSVG";
import {CDN_URL_ICONS} from "@/configs";
import Text from "@/components/Text";
import React from "react";

const PayTypeItemStyled = styled.div`
  //border: 1px solid #CECECE;
  //border-radius: 8px;
  display: flex;
  align-items: center;
  gap: ${px2rem(4)};
  padding: ${px2rem(16)};
  cursor: pointer;
  color: #FFFFFFA0;
  
  &.isSelected {
    background-color: #000000;
    color: #FFFFFF;
    
    //.package-coins {
    //  color: #FFFFFF;
    //}
  }
  
  .package-content {
    display: flex;
    align-items: center;
    gap: ${px2rem(4)};
  }
  
  .package-title {
    font-size: ${px2rem(14)};
    //color: #CECECE;
    text-align: center;
  }
  
  .package-coins {
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    //color: #FFFFFFA0;
  }
  
  .package-fee {
    font-size: ${px2rem(12)};
    color: #FFE899;
  }
  
  .package-desc {
    font-size: ${px2rem(12)};
    //color: #FFFFFFA0;
  }
`;

const PayTypeItem = (props: any) => {
  const { data, isSelected, onClick } = props;
  return (
    <PayTypeItemStyled className={isSelected ? 'isSelected' : ''} onClick={onClick}>
      <div className={"package-content"}>
        <IconSVG src={`${CDN_URL_ICONS}/${data.icon}`} maxWidth="24" />
        <Text color="text-primary" fontWeight="medium" size="body">
          {data.value.toUpperCase()}
        </Text>
        <Text color="#A1A8B8" fontWeight="regular" size="body">
          {data.name}
        </Text>
      </div>

    </PayTypeItemStyled>
  )
};

export default PayTypeItem;