export type ClientLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  className: string;
};

export const clientLogos: ClientLogo[] = [
  {
    name: "Dubai Holding",
    src: "/client-logos/dubai-holding.avif",
    width: 251,
    height: 172,
    className: "h-16 w-[7.5rem] sm:w-[8.25rem]",
  },
  {
    name: "Australian Government Department of Health, Disability and Ageing",
    src: "/client-logos/australian-government-dhda.svg",
    width: 263,
    height: 42,
    className: "h-10 w-[12.5rem] sm:w-[13.25rem]",
  },
  {
    name: "Presidential Court and National Projects Office",
    src: "/client-logos/presidential-court-national-projects-office.webp",
    width: 864,
    height: 242,
    className: "h-14 w-[13.5rem] sm:w-[14.5rem]",
  },
  {
    name: "Abu Dhabi Executive Office",
    src: "/client-logos/abu-dhabi-executive-office.webp",
    width: 879,
    height: 304,
    className: "h-16 w-[13rem] sm:w-[14.25rem]",
  },
  {
    name: "Tasama Business Services",
    src: "/client-logos/tasama-business-services.webp",
    width: 1113,
    height: 234,
    className: "h-12 w-[13.5rem] sm:w-[15rem]",
  },
];
