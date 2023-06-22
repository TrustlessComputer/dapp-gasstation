import Text from "@/components/Text";
import React, {useEffect, useState} from "react";
import {PaytypeListStyled} from "./styled";
import PayTypeItem from "@/modules/Home/PaymentForm/PaytypeList/item";

export enum PayType {
  eth = "eth",
  btc = "btc",
};

export interface IPayType {
  icon: string;
  value: string,
  name: string;
}

export const ListPayType: Array<IPayType> = [
  {
    icon: "ic-eth.svg",
    value: PayType.eth,
    name: 'Ethereum'
  },
  {
    icon: "ic-btc.svg",
    value: PayType.btc,
    name: 'Bitcoin'
  },
];

const PaytypeList = React.memo((props: any) => {
  const { data, onSelect } = props;
  const [selectedItem, setSelectedItem] = useState<IPayType>();

  useEffect(() => {
    if(data?.length > 0) {
      setSelectedItem(data[0]);
    }
  }, [JSON.stringify(data)]);

  useEffect(() => {
    onSelect && onSelect(selectedItem);
  }, [JSON.stringify(selectedItem)])

  return (
    <PaytypeListStyled>
      <Text
        style={{ textTransform: "uppercase" }}
        size="tini"
        fontWeight="medium"
        color="text-secondary"
        className="mb-8"
      >
        Payment currency
      </Text>
      <div className={"package-content"}>
        {
          data.map((p: any) => {
            return (
              <PayTypeItem key={p.value} data={p} onClick={() => setSelectedItem(p)} isSelected={selectedItem?.value === p.value}/>
            )
          })
        }
      </div>
    </PaytypeListStyled>
  );
});

export default PaytypeList;
