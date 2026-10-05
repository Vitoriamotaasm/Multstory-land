export interface NavigationItem {
  label: string
  href: string
}

export const navigationItems: NavigationItem[] = [
  { 
    label: 'Início', href: '#inicio' 
  },
  { 
    label: 'Portfólio', href: '#cases' 
  },
  { 
    label: 'Serviços', href: '#servicos' 
  },
  { 
    label: 'Sobre',
    href: '#sobre' 
  },
  {
    label: 'Contato',
    href: '#contato',
  },
]
