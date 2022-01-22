import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    cardBgColor: string;
    cardTextColor: string;
    bgColor: string;
    accentColor: string;
    bgAnimation: string;
  }
}
