import { LayoutHoc } from "../components/Layout/Layout";
import Fonts from "../components/Fonts/Fonts";

const Home = () => <div>Welcome to next.js!</div>;

const HomeLaout = LayoutHoc(Home);

class Index extends React.Component {
  componentDidMount() {
    Fonts();
  }

  render() {
    return <HomeLaout />;
  }
}

export default Index;
