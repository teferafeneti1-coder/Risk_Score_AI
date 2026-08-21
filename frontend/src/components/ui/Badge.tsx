import clsx from 'clsx'

type BadgeVariant = 'success' | 'danger' | 'warning' | 'info' | 'neutral'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const styles: Record<BadgeVariant, string> = {
  success: 'bg-green-500/20 text-green-400 border border-green-500/30',
  danger:  'bg-red-500/20 text-red-400 border border-red-500/30',
  warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  info:    'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
  neutral: 'bg-white/5 text-white/70 border border-white/10',
}

export default function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
