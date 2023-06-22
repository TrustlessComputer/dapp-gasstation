import Text from "@/components/Text";
import React, {useState} from "react";
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

interface Props {
  payType: PayType;
  setPayType: (type: PayType) => void;
}

const PaytypeList = React.memo((props: Props) => {
  const [selectedItem, setSelectedItem] = useState<IPayType>();

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
          ListPayType.map((p, index) => {
            return (
              <PayTypeItem key={p.value} data={p} onClick={() => setSelectedItem(p)} isSelected={selectedItem?.value === p.value}/>
            )
          })
        }
      </div>
      {/*<Dropdown
        element={
          <Text color="text-primary" fontWeight="medium" size="body">
            {props.payType.toUpperCase()}
          </Text>
        }
        type="click"
        icon={
          <IconSVG
            src={`${CDN_URL_ICONS}/ic-${props.payType}.svg`}
            maxWidth="28"
          />
        }
        ref={dropdownRef}
      >
        <DropdownList>
          {ListPayType.map((item, index) => (
            <DropdownItem
              key={index.toString()}
              onClick={() => {
                dropdownRef.current.onToggle();
                props.setPayType(item.value);
              }}
            >
              <div className="item">
                <IconSVG src={`${CDN_URL_ICONS}/${item.icon}`} maxWidth="28" />
                <div>
                  <Text color="text-primary" fontWeight="medium" size="body">
                    {item.value.toUpperCase()}
                  </Text>
                  <Text color="#A1A8B8" fontWeight="regular" size="body">
                    {item.name}
                  </Text>
                </div>
              </div>
            </DropdownItem>
          ))}
        </DropdownList>
      </Dropdown>*/}
    </PaytypeListStyled>
  );
});

export default PaytypeList;
