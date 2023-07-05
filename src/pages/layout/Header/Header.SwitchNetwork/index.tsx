/* eslint-disable @typescript-eslint/no-explicit-any */
import {useAppDispatch, useAppSelector} from '@/state/hooks';
import React from 'react';
import s from './styles.module.scss';
import {selectApplication, updateCurrentChain} from "@/state/application/reducer";
import storageLocal from "@/lib/storage.local";
import {CHAIN_INFO} from "@/constants/storage-key";
import {compareString} from "@/utils";
import {L2_CHAIN_INFO, TRUSTLESS_COMPUTER_CHAIN_INFO} from "@/constants/chains";

const HeaderSwitchNetwork = () => {
  const dispatch = useAppDispatch();
  const currentChain = useAppSelector(selectApplication).currentChain || L2_CHAIN_INFO;

  const onChangeRouter = (_chainA?: any) => {
    dispatch(updateCurrentChain(_chainA));
    storageLocal.set(CHAIN_INFO, JSON.stringify(_chainA));
  };

  return (
    <SwitchSymbol
      chainA={L2_CHAIN_INFO}
      chainB={TRUSTLESS_COMPUTER_CHAIN_INFO}
      currentSelectedChain={currentChain}
      onSelectChain={onChangeRouter}
    />
  );
};

export const SwitchSymbol = ({
                               chainA,
                               chainB,
                               currentSelectedChain,
                               onSelectChain,
                             }: {
  chainA: any;
  chainB: any;
  currentSelectedChain: any;
  onSelectChain: (_1?: any, _2?: any) => void;
}) => {
  const selectPair = (_chainA?: any, _chainB?: any) => {
    onSelectChain?.(_chainA, _chainB);
  };

  return (
    <div className={s.switchContainer}>
      <div
        className={
          compareString(currentSelectedChain.chain, chainA?.chain)
            ? s.switchContainer__active
            : ''
        }
        onClick={() => selectPair(chainA, chainB)}
      >
        <div>{chainA?.chain}</div>
      </div>
      <div
        className={
          compareString(currentSelectedChain.chain, chainB?.chain)
            ? s.switchContainer__active
            : ''
        }
        onClick={() => selectPair(chainB, chainA)}
      >
        <div>{chainB?.chain}</div>
      </div>
    </div>
  )
};

export default HeaderSwitchNetwork;
