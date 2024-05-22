import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import { JsxElementProps } from '#fragments/lib/types'

/**
 * @component HoverCard (Required)
 * @returns {JSX.Element} The rendered HoverCard component.
 *
 * @description The HoverCard component is used to create a hover card with a trigger and content.
 * @example  <HoverCard>...</HoverCard>
 */
function HoverCard({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div class={cn('relative', className)} x-data="{showHoverCard : false}" {...rest}>
      {children}
    </div>
  )
}

/**
 * @component HoverCardTrigger (Required)
 * @returns {JSX.Element} The rendered HoverCardTrigger component.
 *
 * @description The HoverCardTrigger component is used to create a trigger for the HoverCard component.
 * @example  <HoverCardTrigger>...</HoverCardTrigger>
 */
function HoverCardTrigger({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <span
      x-ref="hoverCardTrigger"
      x-on:mouseover="showHoverCard=true"
      x-on:mouseleave="showHoverCard=false"
      class={cn(className)}
      {...rest}
    >
      {children}
    </span>
  )
}

/**
 * @component HoverCardContent (Required)
 * @returns {JSX.Element} The rendered HoverCardContent component.
 *
 * @description The HoverCardContent component is used to create the content for the HoverCard component.
 * @example  <HoverCardContent>...</HoverCardContent>
 */
function HoverCardContent({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props

  const styles =
    'z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none'
  return (
    <div
      x-show="showHoverCard"
      x-anchor="$refs.hoverCardTrigger"
      x-on:mouseover="showHoverCard=true"
      x-on:mouseleave="showHoverCard=false"
      x-transition
      attrs={{
        'x-anchor.offset.5': '$refs.hoverCardTrigger',
        'x-transition.delay.500ms': true,
      }}
      class={cn(styles, className)}
      {...rest}
    >
      {children}
    </div>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
