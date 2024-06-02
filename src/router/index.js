
import { createRouter, createWebHistory } from "vue-router";
import CountriesList from "../components/CountriesList.vue"
import CountryDetails from "../components/CountryDetails.vue"
const routes = [
  {
    path: "/",
    name: "list",
    component: () => import("../components/CountriesList.vue"),
    children: [
      {
        path: "/list/:alpha3Code",
        name: "list",
        component: () => import("../components/CountryDetails.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

export default router;