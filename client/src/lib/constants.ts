import { SchoolProject } from '../components/work/ProjectsSection';
import { Album } from '../components/work/PhotographySection';

export const SCHOOL_PROJECTS: SchoolProject[] = [
  {
    id: "cts",
    title: "CTS - Identité visuelle",
    description: "Refonte complète de l'identité visuelle de la Compagnie des Transports Strasbourgeois (CTS) pour moderniser son image et renforcer sa cohérence.",
    year: "2024",
    category: "Design Graphique",
    tags: ["Identité visuelle", "Branding", "Communication"],
    mainImage: "/images/projects/cos1.jpg",
    images: [
      "/images/projects/cos2.jpg",
      "/images/projects/cos3.jpg",
      "/images/projects/cos4.jpg",
      "/images/projects/cos5.jpg",
      "/images/projects/cos6.jpg",
      "/images/projects/cos7.jpg",
    ],
    objectives: [
      "Moderniser l'image de la CTS",
      "Renforcer la visibilité de la marque",
      "Assurer une cohérence sur tous les supports de communication"
    ],
    skills: [
      "Design graphique",
      "Branding",
      "Direction artistique"
    ],
    color: "#FF8C00",
    featured: true,
    slug: "cts-identite-visuelle"
  },
  {
    id: "sera",
    title: "SERA - Refonte d'identité",
    description: "Refonte de l'identité visuelle de l'association SERA (anciennement Abbé Pierre) pour moderniser son image tout en restant fidèle à ses valeurs.",
    year: "2024",
    category: "Design Graphique",
    tags: ["Identité visuelle", "Association", "Branding"],
    mainImage: "/images/projects/sera1.jpg",
    images: [
      "/images/projects/sera2.jpg",
      "/images/projects/sera3.jpg",
      "/images/projects/sera4.jpg",
      "/images/projects/sera5.jpg",
      "/images/projects/sera6.jpg",

    ],
    objectives: [
      "Moderniser l'image de l'association",
      "Respecter les valeurs de solidarité et d'inclusion",
      "Créer une identité reconnaissable"
    ],
    skills: [
      "Design graphique",
      "Branding social",
      "Communication visuelle"
    ],
    color: "#4CAF50",
    featured: true,
    slug: "sera-refonte-identite"
  },
  {
    id: "moov-europa",
    title: "Moov Europa UI/UX",
    description: "Conception d'une application regroupant l'ensemble des trains en Europe, avec développement de son interface utilisateur.",
    year: "2024",
    category: "UI/UX Design",
    tags: ["UI/UX", "Application mobile", "Transport"],
    mainImage: "/images/projects/moov1.jpg",
    images: [
        "/images/projects/moov1.jpg",
        "/images/projects/moov2.jpg",
    ],
    objectives: [
      "Regrouper l'information sur les trains européens",
      "Créer une interface intuitive et fonctionnelle",
      "Optimiser l'expérience utilisateur"
    ],
    skills: [
      "UI/UX Design",
      "Prototypage",
      "Design d'application"
    ],
    color: "#2196F3",
    featured: true,
    slug: "moov-europa-ui-ux"
  },
  {
    id: "harmonia",
    title: "Harmonia - Interface web",
    description: "Création d'une interface de site web dédiée à la promotion de montres connectées pour la surveillance du stress et du rythme cardiaque en temps réel.",
    year: "2025",
    category: "Web Design",
    tags: ["Interface web", "E-commerce", "Santé connectée"],
    mainImage: "/images/projects/harm1.jpg",
    images: [
      "/images/projects/harm1.jpg",
      "/images/projects/harm2.jpg"
    ],
    objectives: [
      "Mettre en valeur les fonctionnalités des montres connectées",
      "Offrir une expérience utilisateur fluide et moderne",
      "Créer un design engageant qui valorise les produits"
    ],
    skills: [
      "Web design",
      "UI/UX",
      "Design d'interface"
    ],
    color: "#9C27B0",
    featured: false,
    slug: "harmonia-interface"
  },
  {
    id: "topolino",
    title: "Identité visuelle Topolino",
    description: "Création d'une campagne publicitaire et élaboration d'un concept autour de la Topolino Riviera, avec conception d'affiches dans des lieux emblématiques.",
    year: "2023",
    category: "Publicité",
    tags: ["Campagne publicitaire", "Automobile", "Affiches"],
    mainImage: "/images/projects/topolino4.jpg",
    images: [
      "/images/projects/topolino1.jpg",
      "/images/projects/topolino2.jpg",
      "/images/projects/topolino3.jpg",
      "/images/projects/topolino4.jpg"
    ],
    objectives: [
      "Renforcer l'identité du véhicule",
      "Intégrer la voiture dans son environnement idéal",
      "Valoriser le caractère, le style et la polyvalence du produit"
    ],
    skills: [
      "Direction artistique",
      "Conception publicitaire",
      "Design graphique"
    ],
    color: "#FF5252",
    featured: true,
    slug: "topolino-identite-visuelle"
  },
  {
    id: "trenitalia",
    title: "Trenitalia - Milan Fashion Week",
    description: "Réalisation d'affiches imprimées et animations pour une campagne Trenitalia en tant que transporteur officiel de la Milan Fashion Week.",
    year: "2024",
    category: "Publicité",
    tags: ["Campagne publicitaire", "Mode", "Animation"],
    mainImage: "/images/projects/train1.jpg",
    images: [
      "/images/projects/train1.jpg",
      "/images/projects/train2.jpg",
      "/images/projects/train.jpg",
      "/images/projects/train3.jpg",


    ],
    objectives: [
      "Associer Trenitalia à la Milan Fashion Week",
      "Allier élégance, mobilité et modernité",
      "Valoriser l'image de marque"
    ],
    skills: [
      "Design d'affiche",
      "Animation",
      "Direction artistique"
    ],
    color: "#F44336",
    featured: false,
    slug: "trenitalia-fashion-week"
  },
  {
    id: "amour-ouf",
    title: "Création visuelle Amour Ouf",
    description: "Réalisation d'illustrations pour le film L'Amour Ouf, entièrement dessinées sur Procreate.",
    year: "2024",
    category: "Illustration",
    tags: ["Cinéma", "Illustration", "Procreate"],
    mainImage: "/images/projects/amour.jpg",
    images: [
      "/images/projects/amour.jpg"
    ],
    objectives: [
      "Accompagner visuellement l'univers du film",
      "Explorer l'esthétique et les personnages",
      "Créer une identité visuelle cohérente"
    ],
    skills: [
      "Illustration digitale",
      "Direction artistique",
      "Procreate"
    ],
    color: "#E91E63",
    featured: true,
    slug: "amour-ouf-illustrations"
  },
  {
    id: "apres-cocktails",
    title: "Apres Cocktails",
    description: "Création visuelle pour une marque de cocktails.",
    year: "2024",
    category: "Design Graphique",
    tags: ["Boisson", "Packaging", "Identité visuelle"],
    mainImage: "/images/projects/cock1.jpg",
    images: [
      "/images/projects/cock1.jpg",
      "/images/projects/cock2.jpg"
    ],
    objectives: [
      "Créer une identité visuelle attrayante",
      "Développer un univers de marque cohérent",
      "Concevoir un packaging distinctif"
    ],
    skills: [
      "Design graphique",
      "Packaging design",
      "Branding"
    ],
    color: "#00BCD4",
    featured: false,
    slug: "apres-cocktails"
  }
];

export const PHOTO_ALBUMS: Album[] = [
  {
    id: "rallye-coupe-france",
    title: "Coupe de France de Rallye",
    description: "Réalisation de photographies de plateau dans le cadre d'un reportage mené avec Cigless Film sur la Coupe de France de Rallye. Ce projet m'a permis de documenter l'événement de l'intérieur, en capturant à la fois les coulisses, l'intensité des courses et les moments clés de la compétition.",
    category: "Rallye",
    coverImage: "/images/projects/rallye1.jpg",
    images: [
      "/images/projects/rallye1.jpg",
      "/images/projects/rallye2.jpg",
      "/images/projects/rallye3.jpg",
      "/images/projects/rallye4.jpg",
    ],
    imageCount: 4,
    createdAt: "2023-10",
    slug: "rallye-coupe-france"
  },
  {
    id: "mode-portraits",
    title: "Portraits Mode",
    description: "Réalisation de photographies de mode mettant en valeur les mannequins à travers les poses, les expressions et la mise en scène, afin de refléter leur personnalité et leur style.",
    category: "Mode",
    coverImage: "/images/projects/mode2.jpg",
    images: [
      "/images/projects/mode1.jpg",
      "/images/projects/mode2.jpg",
      "/images/projects/mode3.jpg",
    ],
    imageCount: 3,
    createdAt: "2023-11",
    slug: "mode-portraits"
  },
  {
    id: "sport-action",
    title: "Sport en Action",
    description: "Capturer l'énergie et la passion du sport à travers l'objectif. Une série de photographies mettant en valeur les athlètes dans leurs moments les plus intenses, révélant la force, l'agilité et la détermination.",
    category: "Sport",
    coverImage: "/images/projects/sport1.jpg",
    images: [
      "/images/projects/sport.jpg",
      "/images/projects/sport1.jpg"
    ],
    imageCount: 4,
    createdAt: "2023-09",
    slug: "sport-action"
  },
  {
    id: "laverie-nocturne",
    title: "Laverie Nocturne",
    description: "Une exploration visuelle de la vie nocturne dans les laveries automatiques. Cette série capture l'ambiance unique et presque surréaliste de ces espaces urbains la nuit, mélangeant lumières artificielles et moments de solitude.",
    category: "Urban",
    coverImage: "/images/projects/laverie1.jpg",
    images: [
      "/images/projects/laverie1.jpg",
      "/images/projects/laverie2.jpg"
    ],
    imageCount: 3,
    createdAt: "2023-12",
    slug: "laverie-nocturne"
  },
  {
    id: "evenement-prive",
    title: "Evenement",
    description: "Une immersion dans des événements comme des concerts",
    category: "Evenement",
    coverImage: "/images/projects/event1.jpg",
    images: [
      "/images/projects/event1.jpg",
      "/images/projects/event2.jpg",
      "/images/projects/event3.jpg",
      "/images/projects/event4.jpg",
      "/images/projects/event5.jpg",
    ],
    imageCount: 4,
    createdAt: "2024-01",
    slug: "evenement-prive"
  }
];

export interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  coverImage: string;
  author: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
  featured: boolean;
  slug: string;
}

export const BLOG_POSTS: Blog[] = [
  {
    id: "design-thinking-2024",
    title: "Le Design Thinking en 2024 : Évolution et Tendances",
    description: "Une analyse approfondie des nouvelles approches du Design Thinking et son impact sur le design moderne.",
    content: "Le Design Thinking continue d'évoluer et de s'adapter aux besoins changeants de notre société. En 2024, nous observons une transformation significative dans la manière dont les designers abordent les problèmes et créent des solutions...",
    category: "Design",
    coverImage: "/images/projects/topolino4.jpg",
    author: "Une momes",
    readTime: "5 min",
    publishedAt: "2024-03-15",
    tags: ["Design Thinking", "Innovation", "Méthodologie"],
    featured: true,
    slug: "design-thinking-2024"
  },
  {
    id: "photographie-minimaliste",
    title: "L'Art de la Photographie Minimaliste",
    description: "Découvrez comment la simplicité peut créer des images puissantes et mémorables.",
    content: "La photographie minimaliste est bien plus qu'une simple tendance esthétique. C'est une approche qui nous pousse à réfléchir sur l'essentiel et à communiquer avec moins...",
    category: "Photographie",
    coverImage: "/images/projects/mode3.jpg",
    author: "Une momes",
    readTime: "4 min",
    publishedAt: "2024-03-10",
    tags: ["Photographie", "Minimalisme", "Composition"],
    featured: true,
    slug: "photographie-minimaliste"
  },
  {
    id: "ui-design-trends",
    title: "Tendances UI Design 2024",
    description: "Les dernières innovations en matière de design d'interface utilisateur qui façonnent l'avenir du web.",
    content: "Le monde du design d'interface utilisateur est en constante évolution. En 2024, nous voyons émerger de nouvelles tendances qui redéfinissent notre façon d'interagir avec le numérique...",
    category: "UI/UX",
    coverImage: "/images/projects/cos3.jpg",
    author: "Une momes",
    readTime: "6 min",
    publishedAt: "2024-03-05",
    tags: ["UI Design", "Tendances", "Web Design"],
    featured: true,
    slug: "ui-design-trends"
  }
];
