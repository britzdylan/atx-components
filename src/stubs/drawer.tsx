import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import { JsxElementProps } from '#fragments/lib/types'

interface DrawerProps extends JsxElementProps {
  children: [JSX.Element, JSX.Element]
}

/**
 * @component Drawer (Required)
 * @returns {JSX.Element} The rendered Drawer component.
 *
 * @description The Drawer component is used to create a drawer with a trigger and content, requiring two children to be passed in the order of [trigger, content].
 * @example  <Drawer>...</Drawer>
 */
function Drawer({ children: [trigger, content], ...props }: DrawerProps): JSX.Element {
  const { class: className, ...rest } = props
  if (trigger && content) {
    return (
      <div x-data="{ open : false }">
        {trigger}
        <template x-teleport="body">
          <div
            x-bind:class="{ 'opacity-0 !-z-10 delay-300': !open, 'opacity-100 delay-0': open }"
            x-cloak
            x-trap="open"
            style="pointer-events: auto;"
            aria-hidden="true"
            x-on:click="open=false"
            attrs={{
              'x-on:keyup.escape': 'open=false',
            }}
            tabindex={1}
            class={cn(
              'fixed inset-0 z-50 bg-black/80 transition-all ease-out duration-100 transform origin-center',
              className
            )}
            {...rest}
          >
            {content}
          </div>
        </template>
      </div>
    )
  } else {
    throw new Error('Drawer component must have exactly two children.')
  }
}

/**
 * @component DrawerContent (Required)
 * @returns {JSX.Element} The rendered DrawerContent component.
 *
 * @description The DrawerContent component is used to create the content for the Drawer component.
 * @example  <DrawerContent>...</DrawerContent>
 */
function DrawerContent({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div
      x-data="{ idDrawerTitle: $id('dialog-title'), idDrawerDescription: $id('dialog-content') }"
      x-bind:id="$id('dialog-content')"
      x-bind:aria-labelledby="idDrawerTitle"
      x-bind:aria-describedby="idDrawerDescription"
      x-on:click="event.stopPropagation()"
      x-bind:class="{ '!bottom-[-100%]': !open, '!bottom-0': open }"
      tabindex={1}
      role="Drawer"
      class={cn(
        'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background transition-all ease-out duration-300 delay-50',
        className
      )}
      {...rest}
    >
      <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </div>
  )
}

interface DrawerDescriptionProps extends JsxElementProps {}

/**
 * @component DrawerDescription (Required)
 * @returns {JSX.Element} The rendered DrawerDescription component (p).
 *
 * @description The DrawerDescription component is used to create a description for the Drawer component, usually nested within the DrawerContent component.
 * @example  <DrawerDescription>...</DrawerDescription>
 */
function DrawerDescription({
  children,
  ...props
}: PropsWithChildren<DrawerDescriptionProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <p
      x-bind:id="idDrawerDescription"
      class={cn('text-sm text-muted-foreground', className)}
      {...rest}
      safe
    >
      {children}
    </p>
  )
}

/**
 * @component DrawerFooter (Required)
 * @returns {JSX.Element} The rendered DrawerFooter component.
 *
 * @description The DrawerFooter component is used to create a footer for the Drawer component, usually nested within the DrawerContent component.
 * @example  <DrawerFooter>...</DrawerFooter>
 */
function DrawerFooter({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div class={cn('mt-auto flex flex-col gap-2 p-4', className)} {...rest}>
      {children}
    </div>
  )
}

/**
 * @component DrawerHeader (Required)
 * @returns {JSX.Element} The rendered DrawerHeader component.
 *
 * @description The DrawerHeader component is used to create a header for the Drawer component, usually nested within the DrawerContent component.
 * @example  <DrawerHeader>...</DrawerHeader>
 */
function DrawerHeader({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props

  return (
    <div class={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...rest}>
      {children}
    </div>
  )
}

/**
 * @component DrawerTitle (Required)
 * @returns {JSX.Element} The rendered DrawerTitle component (h2).
 *
 * @description The DrawerTitle component is used to create a title for the Drawer component, usually nested within the DrawerHeader component.
 * @example  <DrawerTitle>...</DrawerTitle>
 */
function DrawerTitle({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <h2
      x-bind:id="idDrawerTitle"
      class={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...rest}
      safe
    >
      {children}
    </h2>
  )
}

/**
 * @component DrawerTrigger (Required)
 * @returns {JSX.Element} The rendered DrawerTrigger component.
 *
 * @description The DrawerTrigger component is used to create a trigger for the Drawer component.
 * @example  <DrawerTrigger>...</DrawerTrigger>
 */
function DrawerTrigger({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <span x-on:click="open=!open" class={cn('cursor-pointer', className)} {...rest}>
      {children}
    </span>
  )
}

/**
 * @component DrawerClose (Required)
 * @returns {JSX.Element} The rendered DrawerClose component.
 *
 * @description The DrawerClose component is used to create a close icon for the Drawer component, usually nested within the DrawerHeader component.
 * @example  <DrawerClose>...</DrawerClose>
 */
function DrawerClose({ children }: PropsWithChildren): JSX.Element {
  return <span x-on:click="open=!open">{children}</span>
}

function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger>
        <button>Open Drawer</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerClose>Close</DrawerClose>
        </DrawerHeader>
        <DrawerDescription>Drawer Description</DrawerDescription>
        <DrawerFooter>
          <button>Save</button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
export {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
  DrawerDemo
}
