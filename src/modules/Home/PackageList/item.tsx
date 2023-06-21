import styled from "styled-components";
import px2rem from "@/utils/px2rem";

const PackageItemStyled = styled.div`
  border: 1px solid #CECECE;
  border-radius: 8px;
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

const PackageItem = (props: any) => {
  const { data, isSelected, onClick } = props;
  return (
    <PackageItemStyled className={isSelected ? 'isSelected' : ''} onClick={onClick}>
      <div className={"package-title"}>{data.name}</div>
      <div className={"package-coins"}>
        {
          data?.details?.map((coin: any) => {
           return (
             <div>{coin?.currency} : {coin?.amount}</div>
           )
          })
        }
      </div>
      {/*<div className={"package-desc"}>{data?.description}</div>*/}
      <div className={"package-desc"}>{"This amount is enough for 10 transactions"}</div>
    </PackageItemStyled>
  )
};

export default PackageItem;