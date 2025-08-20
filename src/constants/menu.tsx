
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBullhorn,
//   faUsers,
//   faUserPlus,
//   faBagShopping,
//   faReceipt
// } from "@fortawesome/free-solid-svg-icons";
export const MENUITEMS = [
  {
    name: "HOME",
    path: "/",
    size: 1.5
  },
  {
    name: "STORE/PRODUCTS",
    path: "/product",
    size: 2.5,
    children: [
      {
        name: 'VOSÉ CONCENTRATED BOOSTER',
        path: "/product/booster",
      },
      {
        name: 'PRODUCT CATEGORY',
        path: "/product",
      },
    ]
  },
  {
    name: "BRAND STORY",
    path: "/brand/story",
    size: 2,
    children: [
      {
        name: 'OUR STORY',
        path: "/brand/story",
      },
      {
        name: 'VOSE FORMULA PRINCIPLE',
        path: "/brand/formula",
      },
      {
        name: 'CARE OF VOSÉ',
        path: "/brand/care",
      }
    ]
  },
  {
    name: "TESTIMONIAL",
    path: "/testimonial",
    size: 2
  },
  {
    name: "FAQ",
    path: "/faq",
    size: 1
  },
  {
    name: "CONTACT US",
    path: "/contact_us",
    size: 2
  },
];
