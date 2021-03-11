declare module "@types" {
  
  type HomeStackParamList = {
    Home: undefined;
    Campaign: undefined;
    GamePlay: undefined;
    Ranking: undefined;
  };

  interface Iauth {
    signIn: (data: any) => Promise<void>,
    signOut: () => Promise<void>,
    signUp: (data: any) => Promise<void>
  }
}