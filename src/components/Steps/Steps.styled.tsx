import styled from 'styled-components/macro';
import { BREAKPOINTS } from '@/theme';
import px2rem from '@/utils/px2rem';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: ${px2rem(32)};
  padding-right: ${px2rem(32)};
  @media screen and (max-width: ${BREAKPOINTS.xs}) {
    padding-left: ${px2rem(16)};
    padding-right: ${px2rem(16)};
  }
`;

export const StepItem = styled.div<{
  isSelected: boolean;
  isVerify: boolean;
  hideIndicatorLeft: boolean;
  hideIndicatorRight: boolean;
}>`
  flex: 1;
  .content {
    display: flex;
    flex-direction: column;
    .indicator-container {
      display: flex;
      flex: 1;
      flex-direction: row;
      align-items: center;
      .indicator-left {
        height: 1px;
        flex: 1;
        background-color: ${({ theme, hideIndicatorLeft, isVerify, isSelected }) =>
          hideIndicatorLeft ? 'transparent' : isVerify || isSelected ? theme['button-primary'] : theme['bg'].secondary};
      }
      .indicator-right {
        height: 1px;
        flex: 1;
        background-color: ${({ theme, hideIndicatorRight, isVerify }) =>
          isVerify ? theme['button-primary'] : hideIndicatorRight ? 'transparent' : theme['bg'].secondary};
      }
      .number-container {
        width: ${px2rem(40)};
        height: ${px2rem(40)};
        border-radius: ${px2rem(20)};
        background-color: ${({ theme, isSelected, isVerify }) =>
          isSelected || isVerify ? theme['button-primary'] : theme['bg'].secondary};
        display: flex;
        align-items: center;
        justify-content: center;
        .number {
          font-weight: 600;
          font-size: 16px;
          line-height: 140%;
          text-align: center;
          color: ${({ theme, isSelected, isVerify }) =>
            isSelected || isVerify ? theme['text-parallel'] : theme['text-secondary']};
        }
      }
    }

    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 140%;
      text-align: center;
      padding-left: 16px;
      padding-right: 16px;
      margin-top: 16px;
      color: ${({ theme, isSelected, isVerify }) =>
        isSelected || isVerify ? theme['text-highlight'] : theme['text-secondary']};
      height: 42px;
    }
  }

  @media screen and (max-width: ${BREAKPOINTS.xs}) {
    .content {
      .title {
        padding-left: 4px;
        padding-right: 4px;
        height: 62px;
      }
    }
  }
`;
