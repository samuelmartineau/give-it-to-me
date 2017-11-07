import withRedux from "next-redux-wrapper";
import "isomorphic-unfetch";
import WithLayout from "../components/Layout/WithLayout";
import { compose, setDisplayName, pure, lifecycle } from "recompose";
import { initStore } from "../store";
import withRoot from "../components/withRoot";

const Home = () => <div>Welcome to next.js!</div>;

const HomeWithLayout = compose(
  setDisplayName("HomePage"),
  lifecycle({
    componentDidMount() {}
  }),
  withRoot,
  WithLayout,
  pure
)(Home);

HomeWithLayout.getInitialProps = async ({ store, isServer }) => {
  const res = await fetch("http://localhost:4000/api/wine");
  const json = await res.json();
  console.log("cellar received");
  return { json };
};

export default withRedux(initStore)(HomeWithLayout);
