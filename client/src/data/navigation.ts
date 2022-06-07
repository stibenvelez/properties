import { MegamenuItem, NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";
import __megamenu from "./jsons/__megamenu.json";

export const NAVIGATION_DEMO: NavItemType[] = [
    {
        id: ncNanoId(),
        href: "/",
        name: "Home",
        isNew: true,
    },
    {
        id: ncNanoId(),
        href: "/venta",
        name: "En venta",
        isNew: false,
    },
    {
        id: ncNanoId(),
        href: "/arriendo",
        name: "En arriendo",
        isNew: false,
    },
    {
        id: ncNanoId(),
        href: "/admin/login",
        name: "Admin",
        isNew: false,
    },
];
