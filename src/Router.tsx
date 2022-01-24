import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

interface IRouterProps {}

const Header = styled.div`
  display: flex;
  width: auto;
  position: absolute;
  margin: 20px;
`;

const Home = styled.div`
  padding: 10px;
  margin-right: 10px;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.cardTextColor};
  border-radius: 8px;
  transition: ${(props) => props.theme.bgAnimation};
`;

const SliderRound = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + ${SliderRound} {
      background-color: #2196f3;
    }
    &:focus + ${SliderRound} {
      box-shadow: 0 0 1px #2196f3;
    }
    &:checked + ${SliderRound}:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  }
`;

function Router({}: IRouterProps) {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <>
      <BrowserRouter>
        <Header>
          <Home>
            <Link to="">Home</Link>
          </Home>
          <SwitchLabel>
            <input type="checkbox" onChange={toggleDarkAtom} />
            <SliderRound></SliderRound>
          </SwitchLabel>
        </Header>
        <Switch>
          <Route path="/:coinId">
            <Coin />
          </Route>
          <Route path="/">
            <Coins />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Router;
