import dayjs from 'dayjs'

import {IMAGES} from './assets'

export type DataSkill =
  | 'aws'
  | 'react'
  | 'react-native'
  | 'ts'
  | 'js'
  | 'graphql'
  | 'html'
  | 'css'
  | 'expo'
  | 'swift'
  | 'java'
  | 'objective-c'
  | 'kotlin'

export type DataItem = {
  id: number
  avatar: string | number
  title: string
  subtitle: string
  location?: string
  startDate: string
  endDate?: string
  description?: string
  pictures?: number[]
  skills?: DataSkill[]
}

export const data: Record<'experiences' | 'projects', Array<DataItem>> = {
  experiences: [
    {
      id: 7,
      avatar: IMAGES.elium,
      title: 'Elium',
      subtitle: 'Développeur React-Native',
      location: 'Paris, France',
      startDate: '2022-03-01',
      endDate: dayjs().format('YYYY-MM-DD'),
      description:
        "Maintenance de l'application mobile\nAjouts de fonctionnalités\nMises à jour régulière des librairies dépendantes\nBugfix et optimisations diverses\nCI et automatisation de déploiements",
      pictures: [require('@/assets/images/elium-4.jpeg')],
      skills: ['react-native', 'swift', 'kotlin', 'ts', 'graphql'],
    },
    {
      id: 6,
      avatar: IMAGES.faks,
      title: 'Faks',
      subtitle: 'Développeur React-Native/React',
      location: 'Paris, France',
      startDate: '2021-07-01',
      endDate: dayjs().format('YYYY-MM-DD'),
      description:
        'Refactorisation du projet React-Native sous typescript\nMise en place de tests typescript / jest / e2e (detox)\nMise en place de CI\nAjouts de fonctionnalités pour l’application mobile',
      pictures: [require('@/assets/images/faks-4.png')],
      skills: ['react-native', 'expo', 'ts'],
    },
    {
      id: 5,
      avatar: IMAGES.t2m,
      title: 'T2M',
      subtitle: 'Développeur React-Native',
      location: 'Paris, France',
      startDate: '2019-10-01',
      endDate: '2021-06-01',
      description:
        'Développement de multiples applications mobiles et applications web en react et react-native.\nCréation UI & UX pour certains projets.',
      skills: ['react-native', 'ts', 'graphql', 'aws'],
    },
    {
      id: 4,
      avatar: IMAGES.totem,
      title: 'TOTEM',
      subtitle: 'Développeur React-Native/React',
      location: 'Paris, France',
      startDate: '2017-10-01',
      endDate: '2019-08-01',
      description:
        'Développement de multiples applications mobiles et applications web en react et react-native.\nCréation UI & UX pour certains projets.',
      pictures: [require('@/assets/images/totem-1.webp')],
      skills: ['react-native', 'ts', 'graphql', 'aws'],
    },
    {
      id: 3,
      avatar:
        'https://pbs.twimg.com/profile_images/1022057909574950912/n4Rhq6OS_400x400.jpg',
      title: 'InUse',
      subtitle: 'Développeur React-Native/React',
      location: 'Paris, France',
      startDate: '2016-04-01',
      endDate: '2017-09-01',
      description:
        "Élaboration de l'application mobile en react-native ainsi que l'application web en react.",
      skills: ['react'],
    },
    {
      id: 2,
      avatar:
        'https://pbs.twimg.com/profile_images/1199614550200475648/8RhJUPqy_400x400.jpg',
      description:
        "Titre d'ingénieurie en informatique obtenu en 3 ans en tant qu'alternant au sein de l'EPITA.",
      pictures: [require('@/assets/images/school-epita.jpg')],
      title: 'EPITA',
      skills: ['react-native', 'expo', 'js', 'kotlin', 'swift'],
      subtitle: 'Expert en Ingénierie Informatique',
      location: 'Paris, France',
      startDate: '2016-09-01',
      endDate: '2019-06-01',
    },
    {
      id: 1,
      avatar:
        'https://pbs.twimg.com/profile_images/698184181579440129/SWIxrzd__400x400.jpg',
      title: 'Université Paris-Sud',
      subtitle: 'DUT Informatique',
      location: 'Orsay, France',
      startDate: '2014-09-01',
      endDate: '2016-06-01',
      description:
        "Obtention de mon diplôme de DUT Informatique au sein de l'IUT d'Orsay sur 2 ans.",
      pictures: [require('@/assets/images/iut-orsay.jpg')],
      skills: ['html', 'css', 'js', 'objective-c', 'java'],
    },
  ],
  projects: [
    {
      id: 8,
      avatar: IMAGES.elium,
      startDate: '2022-03-01',
      endDate: '2023-09-01',
      title: 'Elium',
      subtitle: 'Développeur React Native',
      description:
        'Elium est une solution de partage de connaissances pour les entreprises. Il permet aux équipes et aux départements de capturer, créer, organiser et partager facilement le contenu critique autrement perdu au sein de disques partagés et de tchat.',
      skills: ['react-native', 'ts', 'kotlin', 'swift', 'graphql'],
      pictures: [
        require('@/assets/images/elium-1.webp'),
        require('@/assets/images/elium-2.webp'),
        require('@/assets/images/elium-3.webp'),
      ],
    },
    {
      id: 7,
      avatar: IMAGES.faks,
      startDate: '2021-07-01',
      endDate: '2023-08-01',
      title: 'Faks',
      subtitle: 'Développeur React Native',
      description:
        'Faks, c’est l’application qui met en relation les professionnels de la pharmacie : pharmacies, groupements et laboratoires. Faks centralise tous vos échanges avec vos laboratoires, délégués, groupements. Suivre vos demandes et déléguer à votre équipe devient extrêmement simple.',
      skills: ['react-native', 'expo', 'ts'],
      pictures: [
        require('@/assets/images/faks-1.webp'),
        require('@/assets/images/faks-2.webp'),
        require('@/assets/images/faks-3.webp'),
      ],
    },
    {
      id: 6,
      avatar: IMAGES.milinus,
      title: 'Milinus',
      subtitle: 'Développeur React Native',
      pictures: [
        require('@/assets/images/milinus-1.png'),
        require('@/assets/images/milinus-2.png'),
      ],
      startDate: '2020-12-01',
      description:
        "Milinus est une application mobile de fitness. Elle comporte un réseau social (communauté pour partager vos progrès avec d'autres sportifs),des programmes de fitness (personnalisés selon les besoins des utilisateurs), une bibliothèque d'exercices et un guide de nutrition.",
      skills: ['react-native', 'expo', 'ts', 'graphql'],
    },
    {
      id: 5,
      avatar: IMAGES.goodbet,
      title: 'GoodBet',
      subtitle: 'Développeur React Native',
      pictures: [
        require('@/assets/images/goodbet-1.png'),
        require('@/assets/images/goodbet-2.png'),
      ],
      startDate: '2020-03-01',
      description:
        'L’application “The Good Bet” est la première application de pronostics sportifs gratuits en France ! En regardant une publicité pour valider son pari, l’utilisateur peut même gagner de l’argent, les points gagnés lors de ces pronostics peuvent ensuite être convertis en euros. L’application se veut comme un choix alternatif aux sites et applications de paris sportifs payants.',
      skills: ['react-native', 'expo', 'graphql', 'aws'],
    },
    {
      id: 4,
      avatar: IMAGES.nobelGame,
      title: 'Nobel Game',
      subtitle: 'Développeur React Native',
      pictures: [
        require('@/assets/images/nobel-game-1.png'),
        require('@/assets/images/nobel-game-2.png'),
      ],
      startDate: '2019-12-01',
      description:
        'Vaut-il mieux publier au plus vite au risque de se tromper ou prendre son temps au risque de se faire devancer ? A travers cette application mobile « serious game » multi-joueurs, Les participants sont invités à découvrir les enjeux, les forces et les contraintes qui animent la recherche scientifique en confrontant leurs stratégies de publication à celles des autres participants, joueurs ou bots.',
      skills: ['react-native', 'expo', 'graphql'],
    },
    {
      id: 3,
      avatar: IMAGES.tamers,
      title: 'Tamers',
      subtitle: 'Développeur React Native',
      pictures: [
        require('@/assets/images/tamers-1.png'),
        require('@/assets/images/tamers-2.png'),
        require('@/assets/images/tamers-3.png'),
      ],
      startDate: '2019-04-01',
      description:
        "L'application tamers est une plateforme de développement personnel, elle propose à ses utilisateurs de d'améliorer sa vie professionnelle ou personnelle via des missions et des forums de discussions. Un back office personnalisé permet à ces coachs de gérer toute cette communauté.\nGuider votre équipe vers le succès ? Faire les meilleurs choix professionnels ? Démarrer votre entreprise ? Prendre les bonnes décisions ? Surmonter un obstacle ? Trouver les clés pour persévérer et réussir ? Développer vos compétences ?\nTous les sportifs de haut niveau, les entrepreneurs à succès, les grands leaders de ce monde le savent : pour performer, c’est souvent le mental qui fait toute la différence.",
      skills: ['react-native', 'expo', 'graphql'],
    },
    {
      id: 2,
      avatar: IMAGES.design4green,
      title: 'Design4Green',
      startDate: '2018-11-01',
      description:
        "3ème place du Challenge Design4Green. Réalisation d'un site web de formulaire en ligne en 48h.",
      subtitle: 'Développeur Full Stack',
      pictures: [require('@/assets/images/design4green-1.jpeg')],
      skills: ['react', 'aws'],
    },
    {
      id: 1,
      avatar: IMAGES.safetyOlympicsSodexo,
      title: 'Safety Olympics - Sodexo',
      subtitle: 'Développeur React',
      pictures: [
        require('@/assets/images/safety-olympics-sodexo-1.png'),
        require('@/assets/images/safety-olympics-sodexo-2.png'),
      ],
      startDate: '2018-11-01',
      description:
        'Safety olympics est une application multilingue iOS et Android destinée aux employés de la société Sodexo. Ce serious game propose de tester et compléter ses connaissance en identifiant les dangers et les risques pour la sécurité des personnes sur leur lieu de travail puis en trouvant les meilleures actions correctives. Le multilingue permet de rivaliser avec les autres équipes de Sodexo à travers le monde.',
      skills: ['react', 'aws'],
    },
  ],
}
