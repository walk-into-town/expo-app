import { Dispatch, SetStateAction } from "react";

declare module "@types" {
  /* classes */
  type TuseState<T> = [T, Dispatch<SetStateAction<T>>];
  type TsetState<T> = Dispatch<SetStateAction<T>>;

  type BaseFetchRes<T> = Promise<{
    result: 'success' | 'failed',
    data?: T,
    error?: string,
    errdesc?: string,
  }>

  type UseFetchRes<T> = {
    data: T,
    loading: boolean;
    err: string,
    refetch: () => void;
  }

  // list: 캠패인의 id로 조회, single: 해당 객체 id로 조회
  type PinPointReadParams = {
    type: "list" | "single",
    value: string
  }
  type CouponReadParams = {
    type: "campaign" | "pinpoint" | "single",
    value: string
  }
}
