import React, { PropsWithChildren } from "react";

export interface IInitialContext {}

const initialValue: IInitialContext = {};

export const InitialContext =
  React.createContext<IInitialContext>(initialValue);

export const InitialProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  return (
    <InitialContext.Provider value={{}}>{children}</InitialContext.Provider>
  );
};
