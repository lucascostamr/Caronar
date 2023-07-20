import {
  faTachometer,
  faTable,
} from "@fortawesome/free-solid-svg-icons";

const initMenu = [
  {
    label: "Dashboard",
    path: "/passageiro",
    icon: faTachometer,
  },
  {
    label: 'Viagens'
  },  
  {
    label: 'Histórico',
    path: "/passageiro/historico",
    icon: faTable,
  },
  {
    label: "Corridas",
    path: "/passageiro/table",
    icon: faTable,
  },
];

export default initMenu