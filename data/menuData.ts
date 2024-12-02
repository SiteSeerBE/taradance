import type { MenuItemProps } from "@/lib/dataTypes";

export const menuData: MenuItemProps[] = [
  {
    label: "Over ons",
    href: "/over-ons",
    children: [
      {
        label: "Foto's",
        info: "Bekijk een verzameling prachtige beelden die de energie en passie van onze Ierse dansoptredens en evenementen vastleggen.",
        href: "/onver-ons/fotos",
      },
      {
        label: "Video's",
        info: "Ontdek onze inspirerende video's die de dynamiek en sfeer van onze Ierse dansvoorstellingen en workshops weergeven.",
        href: "/onver-ons/videos",
      },
      {
        label: "Historie",
        info: "Een dynamische vereniging die de Ierse cultuur promoot in België door middel van danslessen, optredens en workshops, opgericht in 2008",
        href: "/onver-ons/historie",
      },
      {
        label: "Ierse Dans",
        info: "De wereld ontdekte Ierse dans in 1994 tijdens het Eurovisiesongfestival, wat leidde tot het fenomenale succes van Riverdance en Lord of the Dance, die de traditionele Ierse dans wereldwijd populair maakten.",
        href: "/onver-ons/ierse-dans",
      },
      {
        label: "Ons Team",
        info: "Maak kennis met ons gemotiveerde team van dansers en instructeurs die zich inzetten om de Ierse cultuur te delen en Ierse dans naar een breder publiek te brengen.",
        href: "/onver-ons/team",
      },
    ],
  },
  { label: "Danslessen", href: "/nieuws" },
  { label: "Kalender", href: "/kalender" },
];
