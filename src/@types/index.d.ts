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

  /* naviagetion */
  type MainStackParamList = {
    HomeTab: undefined,
    Game: undefined,
    ModalStack: {
      screen: keyof ModalStackParamList
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

    MakeCampagin: undefined,

    SearchCampagin: undefined
  };
  type ModalStackParamList = {
    MakePinPointModal: undefined,
    MakeCouponModal: undefined,
  }
}
