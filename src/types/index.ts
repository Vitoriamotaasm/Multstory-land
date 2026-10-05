export type ServiceIcon = 'megaphone' | 'video' | 'zap' | 'cpu' | 'shield'

export interface Service {
  title: string
  description: string
  icon: ServiceIcon
  featured: boolean
}

export interface Stat {
  value: string
  label: string
  description: string
}

export interface TeamMember {
  name: string
  role: string
  image: string
}

/** Uma linha da ficha de produção de um Reel (ex.: "Câmera" → "Sony FX3") */
export interface ProductionDetail {
  label: string
  value: string
}

export interface CaseStudy {
  client: string
  title: string
  caption: string
  poster: string
  video: string
  /** duração exibida no card, ex.: "0:44" */
  duration: string
  /** a ideia por trás do Reel, em uma ou duas frases */
  concept: string
  /** como foi produzido — quantas linhas quiser, na ordem em que devem aparecer */
  production: ProductionDetail[]
}

export interface Client {
  name: string
}
