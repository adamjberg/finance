export const ROUTES = {
  Account: {
    new: "/accounts/new",
    view: "/accounts/:id",
    list: "/accounts",
    buildViewById: (id: string) => {
      return `/accounts/${id}`;
    },
  },
};
