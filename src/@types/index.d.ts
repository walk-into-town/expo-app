import { Coupon, PinPoint } from "@types";

declare module "@types" {
  /* auth */
  interface IUser {
    name: string;
  }
  interface IAuth {
    isLoading: boolean;
    isSignout: boolean;
    userToken: IUser;
  }
  interface IUseAuth {
    signIn: (data: any) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (data: any) => Promise<void>;
  }
  interface IAuthContext {
    auth: IAuth,
    useAuth: IUseAuth;
  }

  /* classes */
  type setState = Dispatch<SetStateAction<string[]>>;
  

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
