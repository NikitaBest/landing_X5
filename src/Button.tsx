import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = {
  children: ReactNode
  variant?: ButtonVariant
  startIcon?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

function Button({
  children,
  variant = 'primary',
  className = '',
  startIcon,
  ...props
}: ButtonProps) {
  const classes = `button button--${variant} ${className}`.trim()

  return (
    <button className={classes} {...props}>
      {startIcon ? <span className="button__icon">{startIcon}</span> : null}
      {children}
    </button>
  )
}

export default Button
