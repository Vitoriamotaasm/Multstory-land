import type { CaseStudy } from '../types'
import { casePoster, caseVideo } from '../config/storage'

export const cases: CaseStudy[] = [
  {
    client: 'Baldessar',

    title: 'Dia dos Pais',

    caption: 'Produção audiovisual',

    poster: casePoster('reel-1.jpg'),

    video: caseVideo('reel-1.mp4'),

    duration: '3:17',

    concept:
      'Mostrar o dia a dia da operação por dentro, com ritmo de bastidor e sem cara de comercial.',

    production: [
      { label: 'Direção', value: 'MultStory' },
      { label: 'Captação', value: 'Externa, 1 diária' },
      { label: 'Câmera', value: 'Mirrorless full frame + estabilizador' },
      { label: 'Iluminação', value: 'Luz natural' },
      { label: 'Edição', value: 'Cortes rápidos e color grading' },
      { label: 'Formato', value: 'Reel vertical 9:16' },
    ],
  },

  {
    client: 'BR Hidráulica',

    title: 'A marca em movimento',

    caption: 'Social media & branding',

    poster: casePoster('reel-2.jpg'),

    video: caseVideo('reel-2.mp4'),

    duration: '1:07',

    concept:
      'Apresentar o produto em uso, valorizando acabamento e conforto em planos fechados.',

    production: [
      { label: 'Direção', value: 'MultStory' },
      { label: 'Captação', value: 'Showroom, 1 diária' },
      { label: 'Câmera', value: 'Mirrorless full frame' },
      { label: 'Lentes', value: '35 mm e 85 mm' },
      { label: 'Iluminação', value: 'LED contínuo + difusor' },
      { label: 'Edição', value: 'Montagem, motion e trilha' },
    ],
  },

  {
    client: 'Sany',

    title: 'Pavimentação',

    caption: 'Institucional',

    poster: casePoster('reel-3.jpg'),

    video: caseVideo('reel-3.mp4'),

    duration: '1:03',

    concept:
      'Apresentar o time e o jeito de trabalhar da agência com as próprias pessoas em cena.',

    production: [
      { label: 'Direção', value: 'MultStory' },
      { label: 'Captação', value: 'Estúdio da agência' },
      { label: 'Câmera', value: 'Mirrorless full frame' },
      { label: 'Áudio', value: 'Lapela sem fio' },
      { label: 'Edição', value: 'Montagem, legendas e motion' },
      { label: 'Equipe', value: 'Time interno' },
    ],
  },

  {
    client: 'Nipan',

    title: 'Institucional',

    caption: 'Institucional',

    poster: casePoster('reel-4.jpg'),

    video: caseVideo('reel-4.mp4'),

    duration: '1:45',

    concept:
      'Apresentar o time e o jeito de trabalhar da agência com as próprias pessoas em cena.',

    production: [
      { label: 'Direção', value: 'MultStory' },
      { label: 'Captação', value: 'Estúdio da agência' },
      { label: 'Câmera', value: 'Mirrorless full frame' },
      { label: 'Áudio', value: 'Lapela sem fio' },
      { label: 'Edição', value: 'Montagem, legendas e motion' },
      { label: 'Equipe', value: 'Time interno' },
    ],
  },
]