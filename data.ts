import dayjs, { Dayjs } from 'dayjs'

import { IMAGES } from './assets'

export type DataSkill =
  | 'aws'
  | 'react'
  | 'ts'
  | 'js'
  | 'graphql'
  | 'nodejs'
  | 'html'
  | 'css'
  | 'sql'
  | 'python'

export type DataItem = {
  id: number
  avatar: string | number
  title: string
  subtitle: string
  location?: string
  startDate: Dayjs
  endDate?: Dayjs
  description?: string
  pictures?: number[]
  skills?: DataSkill[]
}

export const data: Record<'experiences' | 'projects', Array<DataItem>> = {
  experiences: [
    {
      id: 1,
      avatar: 'https://pbs.twimg.com/profile_images/698184181579440129/SWIxrzd__400x400.jpg',
      title: 'Université Paris-Sud',
      subtitle: 'DUT Informatique',
      location: 'Orsay, France',
      startDate: dayjs().set('month', 8).set('year', 2014),
      endDate: dayjs().set('month', 5).set('year', 2016),
      description: "Obtention de mon diplôme de DUT Informatique au sein de l'IUT d'Orsay.",
      pictures: [require('~/assets/images/iut-orsay.jpg')],
      skills: ['html', 'css', 'sql', 'js', 'python'],
    },
    {
      id: 2,
      avatar: 'https://pbs.twimg.com/profile_images/1199614550200475648/8RhJUPqy_400x400.jpg',
      title: 'EPITA',
      subtitle: 'Expert en Ingénierie Informatique',
      location: 'Paris, France',
      startDate: dayjs().set('month', 8).set('year', 2016),
      endDate: dayjs().set('month', 5).set('year', 2019),
    },
    {
      id: 3,
      avatar: 'https://pbs.twimg.com/profile_images/1022057909574950912/n4Rhq6OS_400x400.jpg',
      title: 'InUse',
      subtitle: 'Développeur Front End',
      location: 'Paris, France',
      startDate: dayjs().set('month', 3).set('year', 2016),
      endDate: dayjs().set('month', 8).set('year', 2017),
      description:
        "Élaboration de l'application mobile en react-native ainsi que l'application web en react.",
    },
    {
      id: 4,
      avatar: IMAGES.totem,
      title: 'TOTEM',
      subtitle: 'Développeur Full Stack',
      location: 'Paris, France',
      startDate: dayjs().set('month', 9).set('year', 2017),
      endDate: dayjs().set('month', 7).set('year', 2019),
      description:
        'Développement de multiples applications mobiles et applications web en react et react-native.\nCréation UI & UX pour certains projets.',
    },
    {
      id: 5,
      avatar: IMAGES.t2m,
      title: 'T2M',
      subtitle: 'Freelance Développeur Javascript',
      location: 'Paris, France',
      startDate: dayjs().set('month', 9).set('year', 2019),
      endDate: dayjs().set('month', 5).set('year', 2021),
      description:
        'Développement de multiples applications mobiles et applications web en react et react-native.\nCréation UI & UX pour certains projets.',
    },
    {
      id: 6,
      avatar: IMAGES.faks,
      title: 'Faks',
      subtitle: 'Freelance Développeur Mobile',
      location: 'Paris, France',
      startDate: dayjs().set('month', 6).set('year', 2021),
      endDate: dayjs(),
      description:
        'Refactorisation du projet React-Native sous typescript\nMise en place de tests typescript / jest / e2e (detox)\nMise en place de CI\nRajout d’une fonctionnalité pour l’application mobile',
    },
  ],
  projects: [
    {
      id: 1,
      avatar: IMAGES.milinus,
      title: 'Milinus',
      subtitle: 'Développeur React Native',
      pictures: [
        require('~/assets/images/milinus-1.png'),
        require('~/assets/images/milinus-2.png'),
      ],
      startDate: dayjs().set('month', 11).set('year', 2020),
      description:
        "Milinus est une application mobile de fitness. Elle comporte un réseau social (communauté pour partager vos progrès avec d'autres sportifs),des programmes de fitness (personnalisés selon les besoins des utilisateurs), une bibliothèque d'exercices et un guide de nutrition.",
      skills: ['ts', 'graphql'],
    },
    {
      id: 2,
      avatar: IMAGES.safetyOlympicsSodexo,
      title: 'Safety Olympics - Sodexo',
      subtitle: 'Développeur React Native',
      pictures: [
        require('~/assets/images/safety-olympics-sodexo-1.png'),
        require('~/assets/images/safety-olympics-sodexo-2.png'),
      ],
      startDate: dayjs().set('month', 10).set('year', 2018),
      description:
        'Safety olympics” est une application multilingue iOS et Android destinée aux employés de la société Sodexo. Ce serious game propose de tester et compléter ses connaissance en identifiant les dangers et les risques pour la sécurité des personnes sur leur lieu de travail puis en trouvant les meilleures actions correctives. Le multilingue permet de rivaliser avec les autres équipes de Sodexo à travers le monde.',
      skills: ['react', 'aws'],
    },
    {
      id: 3,
      avatar: IMAGES.tamers,
      title: 'Tamers',
      subtitle: 'Développeur React Native',
      pictures: [
        require('~/assets/images/tamers-1.png'),
        require('~/assets/images/tamers-2.png'),
        require('~/assets/images/tamers-3.png'),
      ],
      startDate: dayjs().set('month', 3).set('year', 2019),
      description:
        "L'application tamers est une plateforme de développement personnel, elle propose à ses utilisateurs de d'améliorer sa vie professionnelle ou personnelle via des missions et des forums de discussions. Un back office personnalisé permet à ces coachs de gérer toute cette communauté.\nGuider votre équipe vers le succès ? Faire les meilleurs choix professionnels ? Démarrer votre entreprise ? Prendre les bonnes décisions ? Surmonter un obstacle ? Trouver les clés pour persévérer et réussir ? Développer vos compétences ?\nTous les sportifs de haut niveau, les entrepreneurs à succès, les grands leaders de ce monde le savent : pour performer, c’est souvent le mental qui fait toute la différence.",
      skills: ['react', 'graphql'],
    },
    {
      id: 4,
      avatar: IMAGES.nobelGame,
      title: 'Nobel Game',
      subtitle: 'Développeur React Native',
      pictures: [
        require('~/assets/images/nobel-game-1.png'),
        require('~/assets/images/nobel-game-2.png'),
      ],
      startDate: dayjs().set('month', 11).set('year', 2019),
      description:
        'Vaut-il mieux publier au plus vite au risque de se tromper ou prendre son temps au risque de se faire devancer ? A travers cette application mobile « serious game » multi-joueurs, Les participants sont invités à découvrir les enjeux, les forces et les contraintes qui animent la recherche scientifique en confrontant leurs stratégies de publication à celles des autres participants, joueurs ou bots.',
      skills: ['react', 'graphql'],
    },
  ],
}
