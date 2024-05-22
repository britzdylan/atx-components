import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import type { JsxElementProps } from '#fragments/lib/types'

/**
 * @component Card (Required)
 * @requires children: - The content to be displayed inside the Card.
 * @returns {JSX.Element} The rendered Card component.
 *
 * @description The main Card component is used to wrap content and apply a the card design.
 * @example  <Card>...</Card>
 */
function Card({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  const styles = 'rounded-lg border bg-card text-card-foreground shadow-sm'
  return (
    <div class={cn(styles, className)} {...rest}>
      {children}
    </div>
  )
}

/**
 * @component CardHeader (Required)
 * @requires children: - The content to be displayed inside the CardHeader.
 * @returns {JSX.Element} The rendered CardHeader component.
 *
 * @description The CardHeader component is used to wrap content and apply a the card header design.
 * @example  <CardHeader>...</CardHeader>
 */
function CardHeader({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  const styles = 'flex flex-col space-y-1.5 p-6'

  return (
    <div class={cn(styles, className)} {...rest}>
      {children}
    </div>
  )
}

/**
 * @component CardTitle (Required)
 * @requires children: - The content to be displayed inside the CardTitle.
 * @returns {JSX.Element} The rendered CardTitle component as a h3 element.
 *
 * @description The CardTitle component is used to wrap content and apply a the card title design.
 * @example  <CardTitle>...</CardTitle>
 */
function CardTitle({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  const styles = 'text-2xl font-semibold leading-none tracking-tight'

  return (
    <h3 class={cn(styles, className)} {...rest}>
      {children}
    </h3>
  )
}

/**
 * @component CardDescription (Required)
 * @requires children: - The content to be displayed inside the CardDescription.
 * @returns {JSX.Element} The rendered CardDescription component as a p element.
 *
 * @description The CardDescription component is used to wrap content and apply a the card description design.
 * @example  <CardDescription>...</CardDescription>
 */
function CardDescription({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  const styles = 'text-sm text-muted-foreground'

  return (
    <p class={cn(styles, className)} {...rest}>
      {children}
    </p>
  )
}

/**
 * @component CardContent (Required)
 * @requires children: - The content to be displayed inside the CardContent.
 * @returns {JSX.Element} The rendered CardContent component.
 *
 * @description The CardContent component is used to wrap content and apply a the card content design.
 * @example  <CardContent>...</CardContent>
 */
function CardContent({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  const styles = 'p-6 pt-0'

  return (
    <div class={cn(styles, className)} {...rest}>
      {children}
    </div>
  )
}

/**
 * @component CardFooter (Required)
 * @requires children: - The content to be displayed inside the CardFooter.
 * @returns {JSX.Element} The rendered CardFooter component.
 *
 * @description The CardFooter component is used to wrap content and apply a the card footer design.
 * @example  <CardFooter>...</CardFooter>
 */
function CardFooter({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  const styles = 'flex items-center p-6 pt-0'

  return (
    <div class={cn(styles, className)} {...rest}>
      {children}
    </div>
  )
}

function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardDemo }
