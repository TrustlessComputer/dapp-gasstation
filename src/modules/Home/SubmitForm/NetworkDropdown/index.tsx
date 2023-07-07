import Dropdown, { IDropdownRef } from "@/components/Popover";
import Text from "@/components/Text";
import { CDN_URL } from "@/configs";
import React, { useEffect } from "react";
import { DropdownItem, DropdownList, Element } from "./styled";
import {
  L2_CHAIN_INFO,
  TRUSTLESS_COMPUTER_CHAIN_INFO,
} from "@/constants/chains";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  selectApplication,
  updateCurrentChain,
} from "@/state/application/reducer";
import storageLocal from "@/lib/storage.local";
import { CHAIN_INFO } from "@/constants/storage-key";

const NETWORKS = [L2_CHAIN_INFO, TRUSTLESS_COMPUTER_CHAIN_INFO];

const NetworkDropdown = React.memo(() => {
  const dropdownRef = React.useRef<IDropdownRef>({
    onToggle: () => undefined,
  });

  const dispatch = useAppDispatch();
  const currentChain =
    useAppSelector(selectApplication).currentChain || L2_CHAIN_INFO;

  const onChangeRouter = (_chainA?: any) => {
    dispatch(updateCurrentChain(_chainA));
    storageLocal.set(CHAIN_INFO, JSON.stringify(_chainA));
  };

  return (
    <div className="mb-8">
      <Text
        style={{ textTransform: "uppercase" }}
        size="tini"
        fontWeight="medium"
        color="text-secondary"
        className="mb-8"
      >
        Network
      </Text>
      <Dropdown
        element={
          <Element>
            <img className="icon" src={`${currentChain.icon}`} />
            <Text color="text-primary" fontWeight="medium" size="body">
              {currentChain.name}
            </Text>
          </Element>
        }
        type="click"
        ref={dropdownRef}
        width={400}
      >
        <DropdownList>
          {NETWORKS.map((item, index) => (
            <DropdownItem
              key={index.toString()}
              onClick={() => {
                dropdownRef.current.onToggle();
                onChangeRouter(item);
              }}
            >
              <div className="item">
                <img className="icon" src={`${item.icon}`} />
                <div>
                  <Text color="text-primary" fontWeight="medium" size="note">
                    {item.name}
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

export default NetworkDropdown;
