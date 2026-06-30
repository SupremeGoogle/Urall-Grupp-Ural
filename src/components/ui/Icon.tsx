import {
  Factory, Zap, ShieldCheck, Settings, Truck, Home, CalendarDays,
  ClipboardCheck, Wrench, CheckCircle2, Target, Banknote, Award,
  HardHat, FileText, Car, Search, Droplets, Ruler, Tractor,
  Building2, FileCheck, type LucideIcon,
} from 'lucide-react'

const MAP: Record<string, LucideIcon> = {
  factory: Factory,
  zap: Zap,
  'shield-check': ShieldCheck,
  settings: Settings,
  truck: Truck,
  home: Home,
  calendar: CalendarDays,
  'clipboard-check': ClipboardCheck,
  wrench: Wrench,
  'check-circle': CheckCircle2,
  target: Target,
  banknote: Banknote,
  award: Award,
  'hard-hat': HardHat,
  'file-text': FileText,
  car: Car,
  search: Search,
  droplet: Droplets,
  ruler: Ruler,
  tractor: Tractor,
  'building-2': Building2,
  'file-check': FileCheck,
}

interface Props {
  name: string
  size?: number
  className?: string
}

export default function Icon({ name, size = 24, className = '' }: Props) {
  const Cmp = MAP[name]
  // Fallback: render the raw string (covers any custom value typed in admin)
  if (!Cmp) return <span className={className}>{name}</span>
  return <Cmp size={size} strokeWidth={1.6} className={className} />
}
