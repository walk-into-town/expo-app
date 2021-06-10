declare module "@types" {
    /* ATUH */
    type Auth = {
        userToken: IUserToken | undefined;
    }
    type AuthReduceAction = 'RESTORE_TOKEN' | 'SIGN_OUT' | 'SIGN_IN' | 'EDIT' | "SETTING"
    type AuthReduce = (state: Auth, action: { type: AuthReduceAction, userToken?: IUserToken }) => Auth;
    type UseAuth = {
        signIn: (data: { id: string, pw: string }) => Promise<string>;
        signOut: (data: { id: string }) => void;
        onEdit: (data: { nickname: string, profileImg: string, selfIntroduction: string }) => void
        setting: (data: { playBGM?: boolean, useDist?: boolean }) => void
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
    }

    /* Location */
    interface ILocationContext {
        playSound: () => void;
        stopSound: () => void;
    }

    interface IUserToken {
        id: string;
        nickname: string;
        profileImg: string;
        selfIntroduction: string;
        setting: {
            playBGM: boolean,
            useDist: boolean
        }
    }

}