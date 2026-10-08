import type { TeamMember } from '../types'
import { imageUrl } from '../config/storage'

export const team: TeamMember[] = [
  {
    name: 'Adrian',
    role: 'Videomaker',
    image: imageUrl('team/adrian-foto.jpg'),
  },

  {
    name: 'Milena',
    role: 'Social Media',
    image: imageUrl('team/milena-foto.jpg'),
  },

  {
    name: 'Brendo',
    role: 'Gestor de Tráfego',
    image: imageUrl('team/brendo-foto.jpg'),
  },

  {
    name: 'Laís',
    role: 'Designer',
    image: imageUrl('team/lais-foto.jpg'),
  },

  {
    name: 'Pâmela',
    role: 'Editora',
    image: imageUrl('team/pamela-foto.jpg'),
  },

  {
    name: 'Felicio',
    role: 'Analista',
    image: imageUrl('team/felicio-foto.jpg'),
  },

  {
    name: 'Beatriz',
    role: 'Editora',
    image: imageUrl('team/bia-foto.jpg'),
  },

  {
    name: 'Carolina',
    role: 'Editora',
    image: imageUrl('team/carol-foto.jpg'),
  },

  {
    name: 'Daniel',
    role: 'Coordenador',
    image: imageUrl('team/daniel-foto.jpg'),
  },

  {
    name: 'Vitória',
    role: 'Programadora',
    image: imageUrl('team/vitoria-foto.jpg'),
  },
]