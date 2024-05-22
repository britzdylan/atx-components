import { PropsWithChildren } from 'adonisjsx'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '#fragments/lib/utils'
import type { JsxElementProps } from '#fragments/lib/types'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface BadgeProps extends VariantProps<typeof badgeVariants>, JsxElementProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

/**
 * @component Badge (Required)
 * @requires children: - The text content for the Badge.
 * @returns {JSX.Element} The rendered Badge component.
 *
 * @description This is the Badge element for the Badge, and is responsible for displaying the Badge.
 * @example  <Badge>...</Badge>
 */
function Badge({ children, ...props }: PropsWithChildren<BadgeProps>): JSX.Element {
  const { variant, class: className } = props
  return (
    <div class={cn(badgeVariants({ variant }), className)} {...props} safe>
      {children}
    </div>
  )
}

function BadgeDemo() {
  return (
    <div class="flex gap-4">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}

export { Badge, BadgeDemo }
