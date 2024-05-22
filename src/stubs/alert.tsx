import { cva, type VariantProps } from 'class-variance-authority'
import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import { JsxElementProps } from '#fragments/lib/types'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

/**
 * @component AlertTitle (Required)
 * @requires children: - The title of the alert.
 * @returns {JSX.Element} The rendered AlertTitle component.
 *
 * @description This is the title element for the Alert, and is responsible for displaying the title of the Alert.
 * @example  <AlertTitle>...</AlertTitle>
 */
function AlertTitle({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props

  return (
    <h5 class={cn('mb-1 font-medium leading-none tracking-tight', className)} {...rest} safe>
      {children}
    </h5>
  )
}

/**
 * @component AlertDescription (Required)
 * @requires children: - The description of the alert.
 * @returns {JSX.Element} The rendered AlertDescription component.
 *
 * @description  This is the description element for the Alert, and is responsible for displaying the description of the Alert.
 * @example  <AlertDescription>...</AlertDescription>
 */
function AlertDescription({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props

  return (
    <div class={cn('text-sm [&_p]:leading-relaxed', className)} {...rest}>
      {children}
    </div>
  )
}

interface AlertProps extends VariantProps<typeof alertVariants>, JsxElementProps {}

/**
 * @component Alert (Required)
 * @requires children: - The parent element for the AlertTitle and AlertDescription.
 * @returns {JSX.Element} The rendered Alert component.
 *
 * @description This is the parent element for the Alert, and is responsible for displaying the Alert.
 * @example  <Alert>...</Alert>
 */
function Alert({ children, ...props }: PropsWithChildren<AlertProps>): JSX.Element {
  const { variant, class: className, ...rest } = props
  return (
    <div role="alert" class={cn(alertVariants({ variant }), className)} {...rest}>
      {children}
    </div>
  )
}

function AlertDemo() {
  return (
    <Alert variant="destructive">
      <AlertTitle>Alert Title</AlertTitle>
      <AlertDescription>
        This is a description for the alert. It can be used to provide more context to the user.
      </AlertDescription>
    </Alert>
  )
}

export { AlertTitle, AlertDescription, Alert, AlertDemo }
