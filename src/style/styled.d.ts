import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      main: string;
      second: string;
      error: string;
      success: string;
    };
  }
}
