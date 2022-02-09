import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { currentPageState } from "../atoms";

function Movies() {
  const setCurrent = useSetRecoilState(currentPageState);
  useEffect(() => {
    setCurrent({ path: "/movies" });
  }, []);

  return <h1>Movies</h1>;
}
export default Movies;
