const roleToRoute = {
  coustomer: [
    {
      name: 'product',
    },
    {
      name: 'productList',
    },
    {
      name: 'productAdd',
    },
  ],
  admin: [
    {
      name: 'product',
    },
    {
      name: 'productList',
    },
    {
      name: 'productAdd',
    },
    {
      name: 'productCategory',
    },
  ],
};

export default function getMenuRoutes(role, routes) {
  const allowRoutesName = roleToRoute[role].map((item) => item.name);
  const resultRoutes = routes.filter((route) => allowRoutesName.indexOf(route.name) !== -1);
  for (let i = 0; i < resultRoutes.length; i += 1) {
    resultRoutes[i].children = resultRoutes[i].children
      .filter((childRoute) => allowRoutesName.indexOf(childRoute.name) !== -1);
  }
  return resultRoutes;
}
