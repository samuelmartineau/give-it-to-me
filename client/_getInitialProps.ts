import { getCellar, getWineFamilies } from '~/client/store';

export const getInitialProps = async ({ store }) => {
  const result = await Promise.all([
    store.dispatch(getCellar()),
    store.dispatch(getWineFamilies()),
  ]);
  return {
    result,
  };
};
