import withWidth from "material-ui/utils/withWidth";
import { compose } from "recompose";
import { LayoutHoc } from "../src/Layout/Layout";

const enhanceLayout = compose(withWidth(), LayoutHoc);

const Home = () => <div>Welcome to next.js!</div>;

const HomeLaout = enhanceLayout(Home);

export default () => <HomeLaout />;
