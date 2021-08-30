export const ROUTES = {
  Account: {
    new: "/accounts/new",
    view: "/accounts/:id",
    list: "/accounts",
    buildViewById: (id: string) => {
      return `/accounts/${id}`;
    },
    Balance: {
      new: "/accounts/balance/new",
      newWithParams: (params: { account: string }) => {
        return `/accounts/balance/new?account=${params.account}`
      }
    }
  },
  Export: "/export"
};
