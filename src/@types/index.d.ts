import { Dispatch, SetStateAction } from "react";

declare module "@types" {
  /* classes */
  type TuseState<T> = [T, Dispatch<SetStateAction<T>>];
  type TsetState<T> = Dispatch<SetStateAction<T>>;

  type BaseFetchRes<T> = Promise<{
    result: 'success' | 'failed',
    message?: T,
    error?: string,
    session: any
  }>
  
  type UseFetchRes<T> = {
    data: T,
    loading: boolean;
    err: string,
    refetch: () => void;
  }
}
