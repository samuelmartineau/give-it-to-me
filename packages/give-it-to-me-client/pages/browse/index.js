import { LayoutHoc } from "../../components/Layout/Layout";

const Browse = () => <div>Browse your wines</div>;

const BrowseLaout = LayoutHoc(Browse);

export default () => <BrowseLaout />;
