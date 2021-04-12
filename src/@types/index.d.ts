import { PinPoint } from "@types";

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
  type MainStackParamList = {
    HomeTab: {
      screen?: keyof CampaginStackParamList,
      params?: { pinpoint?: PinPoint }
    },
    Game: undefined,
    ModalStack: {
      screen: keyof ModalStackParamList,
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
    MakeCampagin: { pinpoint?: PinPoint },
    SearchCampagin: undefined
  };
  type MyPageStackParamList = {
    MyPage: undefined,
    MyCoupon: undefined
  };
  type ModalStackParamList = {
    MakePinPointModal: undefined,
    MakeCouponModal: undefined,
    MyCoupon: undefined
  }
}
