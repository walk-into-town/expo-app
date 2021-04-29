import { Coupon, RegisterMember, PinPoint } from "@types";

declare module "@types" {
  /* auth */
  interface IUserToken {
    id: string;
    nickname: string;
    profileImg: string;
    seflIntruduction: string;
  }

  type Loading = { isLoading: boolean }
  type LoadingReduce = (state: Loading, action: { type: 'START' | 'END' }) => Loading
  interface ILoadingContext {
    loading: Loading,
    useLoading: {
      startLoading: () => void;
      endLoading: () => void;
    }
  }

  type Auth = {
    userToken: IUserToken | undefined;
  }
  type AuthReduceAction = 'RESTORE_TOKEN' | 'SIGN_OUT' | 'SIGN_IN'
  type AuthReduce = (state: Auth, action: { type: AuthReduceAction, userToken?: IUserToken }) => Auth;
  type UseAuth = {
    signIn: (data: { id: string, pw: string }) => Promise<string>;
    signOut: (data: { id: string }) => Promise<void>;
  }
  interface IAuthContext {
    auth: Auth,
    useAuth: UseAuth;
  }

  /* classes */
  type setState = Dispatch<SetStateAction<string[]>>;

  type BaseDataFetchRes = {
    result: 'success' | 'failed',
    message?: string,
    error?: string,
    session: any
  }
  type UseFetchRes<T> = {
    data: T,
    loading: boolean;
    err: string,
    refetch: () => void;
  }

  /* navigation */
  type MainStackParamList = {
    HomeTab: {
      screen?: keyof CampaginStackParamList,
    },
    MakeCampaginStack: {
      screen?: keyof MakeCampaginStackParamList,
      params: CampaginParams
    },
    Game: undefined,
    ModalStack: {
      screen: keyof ModalStackParamList
    }
  };

  type HomeTabParamList = {
    MyPageStack: undefined,
    CampaignStack: undefined,
    GamePlay: undefined,
    Ranking: undefined,
  };
  type MyPageStackParamList = {
    MyPage: undefined,
    MyCoupon: undefined,
  };
  type CampaginStackParamList = {
    CampaginStack: undefined,
  };

  type MakeCampaginStackParamList = {
    MakeCampagin: CampaginParams,
    MakePinPoint: CampaginParams,
    MakeCoupon: CampaginParams,
  };
  type CampaginParams = {
    pinpoint?: PinPoint,
    coupon?: Coupon,
    editIndex?: number
  }

  type ModalStackParamList = {
    MyCoupon: undefined,
  };

}
