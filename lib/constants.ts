export type MenuType = "services" | "residential" | "commercial";

export interface NavItem {
  title: string;
  type: MenuType;
  options: string[];
}

export const NAV_LINKS: NavItem[] = [
  {
    title: "Services",
    type: "services",
    options: ["View Services", "UPVC"],
  },
  {
    title: "Residential",
    type: "residential",
    options: ["Mixed-Use", "High Rise", "Plotted / Villas"],
  },
  {
    title: "Commercial",
    type: "commercial",
    options: ["IT", "IT / ITES SEZ", "Retail Malls"],
  },
];
