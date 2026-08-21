import { forwardRef } from 'react'
import clsx from 'clsx'
import Spinner from './Spinner'

type Variant = 'solid' | 'ghost' | 'hero-ghost' | 'cyber'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  isLoading?: boolean
  heroSize?: boolean
  children: React.ReactNode
}

const variantClass: Record<Variant, string> = {
  solid:       'btn btn-solid',
  ghost:       'btn btn-ghost',
  'hero-ghost':'btn btn-hero-ghost',
  cyber:       'btn btn-cyber',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'solid', isLoading, heroSize, children, className, disabled, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          variantClass[variant],
          heroSize && 'btn-hero',
          className,
        )}
        disabled={disabled || isLoading}
        {...rest}
      >
        {isLoading && (
          <span className="mr-2">
            <Spinner size={15} color={variant === 'cyber' ? '#000' : '#fff'} />
          </span>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
