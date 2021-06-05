declare module "@types" {
    /* ATUH */
    type Auth = {
        userToken: IUserToken | undefined;
    }
    type AuthReduceAction = 'RESTORE_TOKEN' | 'SIGN_OUT' | 'SIGN_IN' | 'EDIT'
    type AuthReduce = (state: Auth, action: { type: AuthReduceAction, userToken?: IUserToken }) => Auth;
    type UseAuth = {
        signIn: (data: { id: string, pw: string }) => Promise<string>;
        signOut: (data: { id: string }) => void;
        onEdit: (data: { nickname: string, profileImg: string, selfIntroduction: string }) => void
    }
    interface IAuthContext {
        auth: Auth,
        useAuth: UseAuth;
    }

    /* LOADING */
    type Loading = { isLoading: boolean }
    type LoadingReduce = (state: Loading, action: { type: 'START' | 'END' }) => Loading
    interface ILoadingContext {
        loading: Loading,
        useLoading: {
            startLoading: () => void;
            endLoading: () => void;
        }
    }

    /* BGM */
    interface IBGMContext {
        playSound: () => void;
        stopSound: () => void;
        onSetting: (isPlaying: boolean) => void;
    }

    /* Location */
    interface ILocationContext {
        playSound: () => void;
        stopSound: () => void;
        onSetting: (isPlaying: boolean) => void;
    }

    interface IUserToken {
        id: string;
        nickname: string;
        profileImg: string;
        selfIntroduction: string;
        coords:{
            latitude: number,
            longitude: number

        }
    }

}