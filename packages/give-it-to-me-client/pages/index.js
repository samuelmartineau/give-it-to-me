import { LayoutHoc } from "../src/Layout/Layout";

const Home = () => <div>Welcome to next.js!</div>;

const HomeLaout = LayoutHoc(Home);

export default () => <HomeLaout />;
