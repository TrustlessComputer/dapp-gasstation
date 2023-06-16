import styled from "styled-components";
import px2rem from "@/utils/px2rem";
import amount from "@/utils/amount";

const PackageItemStyled = styled.div`
  border: 1px solid #CECECE;
  border-radius: 8px;
  padding: ${px2rem(16)};
  cursor: pointer;
  
  &.isSelected {
    background-color: #000000;
    
    .package-coins {
      color: #FFFFFF;
    }
  }
  
  .package-title {
    font-size: ${px2rem(14)};
    color: #CECECE;
    text-align: center;
  }
  
  .package-coins {
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    color: #FFFFFFA0;
  }
`;

const PackageItem = (props: any) => {
  const { data, isSelected, onClick } = props;
  return (
    <PackageItemStyled className={isSelected ? 'isSelected' : ''} onClick={onClick}>
      <div className={"package-title"}>{data.title}</div>
      <div className={"package-coins"}>
        {
          data?.coins?.map((coin: any) => {
           return (
             <div>{coin?.name} : {coin?.amount}</div>
           )
          })
        }
      </div>
    </PackageItemStyled>
  )
};

export default PackageItem;