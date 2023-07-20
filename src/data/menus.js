import {
  faTachometer,
  faTable,
} from "@fortawesome/free-solid-svg-icons";

const initMenu = [
  {
    label: "Dashboard",
    path: "/",
    icon: faTachometer,
  },
  {
    label: 'Viagens'
  },
  {
    label: 'Histórico',
    path: "/historico",
    icon: faTable,
  },
  {
    label: "Corridas",
    path: "/table",
    icon: faTable,
  },
];

export default initMenu