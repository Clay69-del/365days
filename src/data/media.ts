export type MediaType = "photo" | "video";

export type MediaItem = {
  type: MediaType;
  src: string;
  title: string;
  poster?: string;
};

export type MediaCategory = {
  id: string;
  title: string;
  items: MediaItem[];
};

/* photos */
import annapurnaBg from "../assets/photos/background of annapurna.jpeg";
import bossieNagarkot from "../assets/photos/bossie-vibe-nagarkot.jpeg";
import brotherGroup from "../assets/photos/brother me and our better halfs.jpeg";
import discordFirstChat from "../assets/photos/discord-first-chat.png";
import doIDeserveHer from "../assets/photos/do i deserve her.jpeg";
import handmadeGamala from "../assets/photos/Handmade gamala of flower from her.jpeg";
import chessboardGift from "../assets/photos/her first gift (chessboard).jpeg";
import jacketGift from "../assets/photos/Her gifted jacket.jpeg";
import offwhiteSaree from "../assets/photos/her offwhite saree.jpeg";
import biodataLol from "../assets/photos/It's okay to ask (biodata) lol.png";
import assignHelp from "../assets/photos/Khushi Asking for assignment help.png";
import laalPariReturns from "../assets/photos/laal pari (returns).jpeg";
import laalPari from "../assets/photos/laal pari.jpeg";
import latestKhushi from "../assets/photos/latest khushi.jpeg";
import maybeIDo from "../assets/photos/maybe i do.jpeg";
import afterClasses from "../assets/photos/me and her after classes over.jpeg";
import basantapur from "../assets/photos/me and her(basantapur).jpeg";
import flirtingPng from "../assets/photos/Me flirting.png";
import handsomePic from "../assets/photos/my handsome pic (only one i have ).jpeg";
import annapurnaLoc from "../assets/photos/my location annapurna.jpeg";
import trekPhoto from "../assets/photos/my trek photo.jpeg";
import nightout from "../assets/photos/Nightout (morning fresh).jpeg";
import teachingRef from "../assets/photos/reference to my teaching.jpeg";
import secretDrive from "../assets/photos/She clicking pics secretly while i was driving.jpeg";
import bouquetToken from "../assets/photos/token of love from her(a small bookeh).jpeg";
import luckyCharm from "../assets/photos/she is my lucky charm.jpeg";

/* videos */
import hoHoHo from "../assets/videos/ho ho ho.mp4";
import bismritiWingman from "../assets/videos/Khushi with our wingman (woman ig) bismriti.mp4";
import meImpressing from "../assets/videos/Me impressing ig.mp4";
import victoryCredit from "../assets/videos/my victory to her credit.mp4";
import chessVideo from "../assets/videos/she playin chess with me.mp4";

export const CATEGORIES: MediaCategory[] = [
  {
    id: "trek",
    title: "Trek & Outdoors",
    items: [
      { type: "photo", src: annapurnaBg, title: "Annapurna Background" },
      { type: "photo", src: annapurnaLoc, title: "My Location (Annapurna)" },
      { type: "photo", src: trekPhoto, title: "Trek Photo" },
      { type: "photo", src: bossieNagarkot, title: "Nagarkot Vibe" },
      { type: "video", src: hoHoHo, title: "ho ho ho.mp4", poster: trekPhoto }
    ]
  },
  {
    id: "us",
    title: "Us / Dates",
    items: [
      { type: "photo", src: afterClasses, title: "After Classes" },
      { type: "photo", src: basantapur, title: "Basantapur" },
      { type: "photo", src: nightout, title: "Night Out" },
      { type: "photo", src: secretDrive, title: "Secret Drive" },
      { type: "photo", src: luckyCharm, title: "Lucky Charm" },
      { type: "photo", src: maybeIDo, title: "Maybe I Do" },
      { type: "photo", src: doIDeserveHer, title: "Do I Deserve Her" },
      { type: "photo", src: brotherGroup, title: "With Our Better Halves" }
    ]
  },
  {
    id: "gifts",
    title: "Gifts & Tokens",
    items: [
      { type: "photo", src: handmadeGamala, title: "Handmade Gamala" },
      { type: "photo", src: chessboardGift, title: "Chessboard Gift" },
      { type: "photo", src: jacketGift, title: "Gifted Jacket" },
      { type: "photo", src: bouquetToken, title: "Bouquet Token" },
      { type: "photo", src: laalPari, title: "Laal Pari" },
      { type: "photo", src: laalPariReturns, title: "Laal Pari (returns)" },
      { type: "photo", src: offwhiteSaree, title: "Offwhite Saree" }
    ]
  },
  {
    id: "discord",
    title: "Discord / Logs / Videos",
    items: [
      { type: "photo", src: discordFirstChat, title: "Discord First Chat" },
      { type: "photo", src: assignHelp, title: "Assignment Help" },
      { type: "photo", src: flirtingPng, title: "Me Flirting" },
      { type: "photo", src: biodataLol, title: "Biodata (lol)" },
      { type: "photo", src: teachingRef, title: "Reference to Teaching" },
      { type: "photo", src: latestKhushi, title: "Latest Khushi" },
      { type: "photo", src: handsomePic, title: "Handsome Pic" },
      { type: "video", src: bismritiWingman, title: "Bismriti", poster: latestKhushi },
      { type: "video", src: meImpressing, title: "Impressing", poster: handsomePic },
      { type: "video", src: victoryCredit, title: "Victory", poster: afterClasses },
      { type: "video", src: chessVideo, title: "Chess With Me", poster: chessboardGift }
    ]
  }
];