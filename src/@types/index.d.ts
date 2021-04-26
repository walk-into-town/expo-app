import { Coupon, RegisterMember, PinPoint } from "@types";

declare module "@types" {
  /* auth */
  interface IUserToken {
    id: string;
    name: string;
    profileImg: string;
    
  }
  interface IAuth {
    isLoading: boolean;
    isSignout: boolean;
    userToken: IUserToken;
  }
  interface IUseAuth {
    signIn: (data: {id: string, pw: string}) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (data: RegisterMember) => Promise<void>;
  }
  interface IAuthContext {
    auth: IAuth,
    useAuth: IUseAuth;
  }

  /* classes */
  type setState = Dispatch<SetStateAction<string[]>>;

  type BaseDataFetchRes = {
    result: 'success' | 'failed',
    message?: string,
    error?: string
  }
  type UseFetchRes = {
    data: any,
    loading: boolean;
    err: string,
    refetch: () => void;
  }

  /* navigation */
  type CampaginParams = {
    pinpoint?: PinPoint,
    coupon?: Coupon,
    editIndex?: number
  }

  type MainStackParamList = {
    HomeTab: {
      screen?: keyof CampaginStackParamList,
    },
    Game: undefined,
    ModalStack: {
      screen: keyof ModalStackParamList,
      params: CampaginParams
    }
  };
  type HomeTapParamList = {
    Home: undefined;
    Campaign: undefined;
    GamePlay: undefined;
    Ranking: undefined;
  };
  type CampaginStackParamList = {
    Campagin: undefined,
    MyCampagin: undefined,
    MakeCampagin: CampaginParams,
    SearchCampagin: undefined
  };
  type MyPageStackParamList = {
    MyPage: undefined,
    MyCoupon: undefined
  };
  type ModalStackParamList = {
    MakePinPointModal: CampaginParams,
    MakeCouponModal: CampaginParams,
    MyCoupon: undefined
  }
}
