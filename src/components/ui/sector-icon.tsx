import {
  HardHat,
  Monitor,
  Stethoscope,
  Shield,
  Zap,
  Truck,
  GraduationCap,
  Briefcase,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sectorIcons: Record<string, LucideIcon> = {
  btp: HardHat,
  informatique: Monitor,
  medical: Stethoscope,
  defense: Shield,
  energie: Zap,
  transport: Truck,
  formation: GraduationCap,
  general: Briefcase,
}

interface SectorIconProps {
  sector: string
  className?: string
  size?: number
}

export function SectorIcon({ sector, className, size = 16 }: SectorIconProps) {
  const key = sector.toLowerCase()
  const Icon = sectorIcons[key] || Briefcase

  return <Icon className={cn("shrink-0", className)} size={size} />
}
