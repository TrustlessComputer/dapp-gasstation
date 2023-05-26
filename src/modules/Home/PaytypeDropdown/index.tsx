import IconSVG from "@/components/IconSVG";
import Dropdown, { IDropdownRef } from "@/components/Popover";
import Text from "@/components/Text";
import { CDN_URL_ICONS } from "@/configs";
import React from "react";
import { DropdownItem, DropdownList } from "./styled";

export enum PayType {
  eth = "eth",
  btc = "btc",
}

export const ListPayType = [
  {
    icon: "eth.svg",
    value: PayType.eth,
  },
  {
    icon: "btc.svg",
    value: PayType.btc,
  },
];

interface Props {
  payType: PayType;
  setPayType: (type: PayType) => void;
}

const PaytypeDropdown = React.memo((props: Props) => {
  const dropdownRef = React.useRef<IDropdownRef>({
    onToggle: () => undefined,
  });

  return (
    <div>
      <Text
        style={{ textTransform: "uppercase" }}
        size="tini"
        fontWeight="medium"
        color="text-secondary"
        className="mb-8"
      >
        Pay type
      </Text>
      <Dropdown
        element={
          <Text color="text-primary" fontWeight="medium" size="body">
            {props.payType.toUpperCase()}
          </Text>
        }
        type="click"
        icon={<IconSVG src={`${CDN_URL_ICONS}/`} maxWidth="32" />}
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
                <IconSVG src={`${CDN_URL_ICONS}/${item.icon}`} maxWidth="32" />
                <div>
                  <Text color="text-primary" fontWeight="medium" size="note">
                    {item.value.toUpperCase()}
                  </Text>
                </div>
              </div>
            </DropdownItem>
          ))}
        </DropdownList>
      </Dropdown>
    </div>
  );
});

export default PaytypeDropdown;
