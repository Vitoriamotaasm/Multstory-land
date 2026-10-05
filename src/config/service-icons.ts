import { Cpu, Megaphone, Shield, Video, Zap } from 'lucide-vue-next'
import type { Component } from 'vue'
import type { ServiceIcon } from '../types'

export const serviceIcons: Record<ServiceIcon, Component> = {
  megaphone: Megaphone,
  video: Video,
  zap: Zap,
  cpu: Cpu,
  shield: Shield,
}
