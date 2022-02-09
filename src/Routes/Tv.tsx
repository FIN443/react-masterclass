import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { currentPageState } from "../atoms";

function Tv() {
  const setCurrent = useSetRecoilState(currentPageState);
  useEffect(() => {
    setCurrent({ path: "/tv" });
  }, []);
  return <h1>Tv</h1>;
}
export default Tv;
