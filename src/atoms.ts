import { atom } from "recoil";

interface ICurrentPage {
  path: string;
}

export const currentPageState = atom<ICurrentPage>({
  key: "current",
  default: {
    path: "/",
  },
});
