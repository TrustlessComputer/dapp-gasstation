/* eslint-disable @typescript-eslint/no-explicit-any */
import {useAppDispatch, useAppSelector} from '@/state/hooks';
import {useEffect} from 'react';
import {BiCheck} from 'react-icons/bi';
import s from './styles.module.scss';
import {selectApplication, updateCurrentChain} from "@/state/application/reducer";
import storageLocal from "@/lib/storage.local";
import {CHAIN_INFO} from "@/constants/storage-key";

export const ItemChain = ({
  _chain,
  showName,
  active,
}: {
  _chain: any;
  showName?: boolean;
  active?: boolean;
}) => {
  return (
    <div className={s.itemChain}>
      <div style={{alignItems: 'center'}} gap={2}>
        <img src={_chain?.icon} />
        <div>{showName ? _chain?.name : _chain?.chain}</div>
      </div>
      {active && <BiCheck color="#fff" style={{ fontSize: 20 }} />}
    </div>
  );
};

const HeaderSwitchNetwork = () => {
  const dispatch = useAppDispatch();
  const currentChain = useAppSelector(selectApplication).currentChain;

  const onChangeRouter = (_chainA?: any) => {
    dispatch(updateCurrentChain(_chainA));
    storageLocal.set(CHAIN_INFO, JSON.stringify(_chainA));
  };

  useEffect(() => {

  }, [currentChain]);

  return (
    <div>dsfasdf</div>
  )

  return (
    /*<Menu placement="bottom-end">
      <MenuButton className={s.btnChainSelected}>
        <Flex alignContent={'center'}>
          <ItemChain _chain={currentChain} />
          <BiChevronDown color="#FFFFFF" style={{ fontSize: 20 }} />
        </Flex>
      </MenuButton>
      <MenuList className={s.chainList}>
        {[TRUSTLESS_COMPUTER_CHAIN_INFO, L2_CHAIN_INFO].map((c) => (
          <MenuItem onClick={() => onChangeRouter(c)} key={c.chainId}>
            <ItemChain
              _chain={c}
              showName={true}
              active={compareString(c.chainId, currentChain?.chainId)}
            />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>*/
  );
};

export default HeaderSwitchNetwork;
