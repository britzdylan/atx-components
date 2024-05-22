import { PropsWithChildren } from 'adonisjsx'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '#fragments/lib/utils'
import type { JsxElementProps } from '#fragments/lib/types'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ButtonProps extends VariantProps<typeof buttonVariants>, JsxElementProps {
  type?: 'button' | 'submit' | 'reset'
  asChild?: boolean
}

/**
 * @component Button (Required)
 * @param {variant} props.variant - The variant of the button. Default is 'default'.
 * @param {size} props.size - The size of the button. Default is 'default'.
 * @param {asChild} props.asChild - If true, the button will be rendered as a div element. Default is false.
 * @param {type} props.type - The type of the button. Default is 'button'.
 * @requires children: - The content to be displayed inside the Button.
 * @returns {JSX.Element} The rendered Button component.
 *
 * @description The Button component is used to create a clickable button element, with 6 different variants & 4 different sizes.
 * @example  <Button>...</Button>
 */
function Button({ children, ...props }: PropsWithChildren<ButtonProps>): JSX.Element {
  const { variant, size, class: className, asChild, ...rest } = props

  if (asChild) {
    return <div class={[cn(buttonVariants({ variant, size })), className]}>{children}</div>
  }
  return (
    <button class={[cn(buttonVariants({ variant, size })), className]} {...rest}>
      {children}
    </button>
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
