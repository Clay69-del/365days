import trekPhoto from "../assets/photos/my trek photo.jpeg";
import discordFirstChat from "../assets/photos/discord-first-chat.png";
import afterClasses from "../assets/photos/me and her after classes over.jpeg";
import ItsOk from "../assets/photos/It's okay to ask (biodata) lol.png";
import handsomePic from "../assets/photos/my handsome pic (only one i have ).jpeg";
import chessboardGift from "../assets/photos/her first gift (chessboard).jpeg";
export type TimelineItem = {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;  // First image (top left)
  secondImage?: string;  // Second image (bottom right)
  dotColor: "blue" | "lavender" | "pink";
};

export const TIMELINE: TimelineItem[] = [
  {
    id: "origin",
    badge: "Discord • Chatting Stage",
    title: "The Origin Packet",
    description:
      "We met on Discord with friends, learning CTF basics. Then you were absent and I unknowingly sent the ping: “Khushi kata xe aaja aayina?”",
    image: discordFirstChat,
    dotColor: "blue"
  },
  {
    id: "remote",
    badge: "Ghandruk • Annapurna Trek",
    title: "The Remote Ping",
    description:
      "You messaged me for assignment help while I was trekking Annapurna. Low signal, but your attention was the strongest connection.",
    image: trekPhoto,
    dotColor: "lavender"
  },
  {
    id: "flirting",
    badge: "Discord • Flirting Stage",
    title: "The Origin Packet",
    description: "Our flirting stage lol. I was teasing you completely...",
    image: ItsOk,
    dotColor: "blue"
  },
  {
    id: "Dating...",
    badge: "Setopul • Maitidevi",
    title: "After-Class Date Loop",
    description:
      "After that first meet and tea near Setopul, our routine started: college → 1-hour date → repeat. Buingal came soon after.",
    image: afterClasses,
    dotColor: "pink"
  },
  {
    id: "Gifts",
    badge: "Gifts • Love++",
    title: "My Gift to her (Protective Boy)",
    description:
      "Then starts the gift exchange stage, where we exchange gifts and express our love for each other.",
    image: handsomePic,
    dotColor: "blue"
  },
  {
    id:"Gifts",
    badge:"Gifts • Love++",
    title:"Her Gift to me (Chalant Girl)",
    description:"Your'e so hardworking and caring andchalant girl, sometimes it feels like you're a superpower to me.",
    image:chessboardGift,
    dotColor:"blue"
  }
];