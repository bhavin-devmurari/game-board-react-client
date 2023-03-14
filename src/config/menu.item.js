import {
  MdHome,
  MdOutlineVideogameAsset,
  MdPeopleOutline,
} from "react-icons/md";

export const navItems = {
  HOME: {
    name: "Home",
    path: "/",
    IconFun: () => <MdHome size={25} />,
  },
  USERS: {
    name: "Users",
    path: "/users",
    IconFun: () => <MdPeopleOutline size={25} />,
  },
  GAMES: {
    name: "Games",
    path: "/games",
    IconFun: () => <MdOutlineVideogameAsset size={25} />,
  },
};
