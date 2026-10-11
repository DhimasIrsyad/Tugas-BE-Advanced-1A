import linkedinIcon from "../assets/icons/linkedin.png";
import facebookIcon from "../assets/icons/facebook.png";
import instagramIcon from "../assets/icons/instagram.png";
import twitterIcon from "../assets/icons/twitter.png";

// TAMBAHKAN DATA INI: Yang tadi hilang sehingga memicu error merah di console
export const navigationData = [
  {
    title: "Kategori",
    links: [
      "Digital & Teknologi",
      "Pemasaran",
      "Manajemen Bisnis",
      "Pengembangan Diri",
      "Desain",
    ],
  },
  {
    title: "Perusahaan",
    links: [
      "Tentang Kami",
      "FAQ",
      "Kebijakan Privasi",
      "Ketentuan Layanan",
      "Bantuan",
    ],
  },
  {
    title: "Komunitas",
    links: ["Tips Sukses", "Blog"],
  },
];

export const socialData = [
  { src: linkedinIcon, alt: "LinkedIn", href: "#" },
  { src: facebookIcon, alt: "Facebook", href: "#" },
  { src: instagramIcon, alt: "Instagram", href: "#" },
  { src: twitterIcon, alt: "Twitter", href: "#" },
];
