import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import type { JsxElementProps } from '#fragments/lib/types'

interface CollapsibleProps extends JsxElementProps {
  defaultOpen?: boolean
}

/**
 * @component Collapsible (Required)
 * @returns {JSX.Element} The rendered Collapsible component.
 *
 * @description The Collapsible component is used to create a collapsible container.
 * @example  <Collapsible>...</Collapsible>
 */
function Collapsible({ children, ...props }: PropsWithChildren<CollapsibleProps>): JSX.Element {
  const { class: className, defaultOpen = true, ...rest } = props

  return (
    <div x-data={`{open: ${defaultOpen}}`} class={cn(className)} x-id="['collapsible']" {...rest}>
      {children}
    </div>
  )
}

/**
 * @component CollapsibleTrigger (Required)
 * @returns {JSX.Element} The rendered CollapsibleTrigger component.
 *
 * @description The CollapsibleTrigger component is used to create a clickable trigger for the CollapsibleContent component.
 * @example  <CollapsibleTrigger>...</CollapsibleTrigger>
 */
function CollapsibleTrigger({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <span
      x-bind:aria-expanded="open"
      x-bind:aria-controls="$id('collapsible')"
      x-on:click="open = !open"
      {...rest}
    >
      {children}
    </span>
  )
}

/**
 * @component CollapsibleContent (Required)
 * @returns {JSX.Element} The rendered CollapsibleContent component.
 *
 * @description The CollapsibleContent component is used to wrap content that will be collapsible.
 * @example  <CollapsibleContent>...</CollapsibleContent>
 */
function CollapsibleContent({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div x-bind:id="$id('collapsible')" x-show="open" x-cloak class={cn(className)} {...rest}>
      {children}
    </div>
  )
}

function CollapsibleDemo() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Click me</CollapsibleTrigger>
      <CollapsibleContent>Content</CollapsibleContent>
    </Collapsible>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent, CollapsibleDemo }
