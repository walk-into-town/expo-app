declare module "@types" {

  /* auth */
  interface IUser {

  }
  interface IAuth {
    isLoading: boolean;
    isSignout: boolean;
    userToken: object;
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
  
  /* naviagetion */
  type HomeStackParamList = {
    Home: undefined;
    Campaign: undefined;
    GamePlay: undefined;
    Ranking: undefined;
  };

}
