import type { Service } from '../types'

export const services: Service[] = [
  {
    icon: 'megaphone',
    title: 'Social Media',
    description: 'Conteúdo com estratégia por trás: planejamento, criação e gestão das redes que constroem sua audiência.',
    featured: true,
  },
  {
    icon: 'video',
    title: 'Produção Audiovisual',
    description: 'Do roteiro à entrega final. Vídeos que prendem a atenção e ajudam sua marca a vender.',
    featured: true,
  },
  {
    icon: 'zap',
    title: 'Tráfego Pago',
    description: 'Meta Ads e Google Ads geridos com foco em resultado e melhor aproveitamento da verba.',
    featured: true,
  },
  {
    icon: 'cpu',
    title: 'Desenvolvimento & IA',
    description: 'Sites, sistemas e automações pensados para deixar a operação mais inteligente.',
    featured: false,
  },
  {
    icon: 'shield',
    title: 'Design & Identidade Visual',
    description: 'Branding que comunica autoridade, consistência e valor para sua marca.',
    featured: false,
  },
]

export const featuredServices = services.filter((service) => service.featured)
