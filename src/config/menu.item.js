import {
  MdHome,
  MdOutlineVideogameAsset,
  MdPeopleOutline,
} from "react-icons/md";
export const menuItems = [
  {
    id: 1,
    name: "Home",
    path: "/",
    IconFun: () => <MdHome size={25} />,
  },
  {
    id: 2,
    name: "Users",
    path: "/users",
    IconFun: () => <MdPeopleOutline size={25} />,
  },
  {
    id: 3,
    name: "Games",
    path: "/games",
    IconFun: () => <MdOutlineVideogameAsset size={25} />,
  },
];
