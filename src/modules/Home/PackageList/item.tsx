import styled from "styled-components";
import px2rem from "@/utils/px2rem";
import React from "react";
import {CDN_URL_ICONS} from "@/configs";

const PackageItemStyled = styled.div`
  border: 1px solid #5B5B5B;
  border-radius: 8px;
  padding: ${px2rem(16)} ${px2rem(24)};
  cursor: pointer;
  color: #FFFFFF;
  position: relative;
  
  &.isSelected {
    border: 1px solid #B1E3FF;
    background-color: rgba(177, 227, 255, 0.20);
    //color: #FFFFFF;
    
    //.package-coins {
    //  color: #FFFFFF;
    //}
    
    .package-desc {
      background: rgba(177, 227, 255, 0.40);
    }
    
    .ic-check-circle {
      display: block;
    }
  }
  
  .ic-check-circle {
    display: none;
    position: absolute;
    top: -${px2rem(8)};
    right: -${px2rem(8)};
  }
  
  .package-header {
    display: flex;
    align-items: center;
    gap: ${px2rem(8)};
  }
  
  .package-title {
    font-size: ${px2rem(16)};
    font-weight: 500;
  }
  
  .package-title-short {
    font-size: ${px2rem(12)};
    font-weight: 400;
  }
  
  .package-coins {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: ${px2rem(8)};
    
    > div {
      display: flex;
      align-items: center;
      gap: ${px2rem(4)};
      font-size: ${px2rem(12)};
      font-weight: 400;
    }
  }
  
  .package-fee {
    font-size: ${px2rem(12)};
    color: #FFE899;
  }
  
  .package-desc {
    font-size: ${px2rem(12)};
    font-weight: 400;
    font-style: italic;
    background-color: #2E2E2E;
    padding: ${px2rem(4)};
    border-radius: 4px;
    margin-top: ${px2rem(20)};
    text-align: center;
  }
`;

const PackageItem = (props: any) => {
  const { data, isSelected, onClick } = props;
  return (
    <PackageItemStyled className={isSelected ? 'isSelected' : ''} onClick={onClick}>
      <img
        className="ic-check-circle"
        alt="logo"
        src={`${CDN_URL_ICONS}/ic-check-circle.svg`}
      />
      <div className={"package-header"}>
        <img
          className="logo"
          alt="logo"
          src={data?.icon}
        />
        <div>
          <div className={"package-title"}>{data.name}</div>
          {/*<div className={"package-title-short"}>{data.shortDescription}</div>*/}
        </div>
      </div>

      <div className={"package-coins"}>
        {
          data?.details?.map((coin: any) => {
           return (
             <div>
               <img
                 className="ic-check"
                 alt="logo"
                 src={`${CDN_URL_ICONS}/ic-check.svg`}
               />
               {coin?.currency} {coin?.amount}
             </div>
           )
          })
        }
      </div>
      <div className={"package-desc"}>{data?.description}</div>
      {/*<div className={"package-desc"}>{"This amount is enough for 10 transactions"}</div>*/}
    </PackageItemStyled>
  )
};

export default PackageItem;