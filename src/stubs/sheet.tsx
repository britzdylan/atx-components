import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import { JsxElementProps } from '#fragments/lib/types'
import { Icon } from '#components'
import { cva } from 'class-variance-authority'

interface SheetProps extends JsxElementProps {
  children: [JSX.Element, JSX.Element]
}

/**
 * Renders an  sheet component.
 *
 * @param {SheetProps} props - The props for the Sheet component.
 * @returns {JSX.Element} The rendered Sheet component.
 * @throws {Error} If the Sheet component does not have exactly two children.
 */
function Sheet({ children: [trigger, content], ...props }: SheetProps): JSX.Element {
  const { class: className, ...rest } = props
  if (trigger && content) {
    return (
      <div x-data="{ open : false }">
        {trigger}
        <template x-teleport="body">
          <div
            x-show="open"
            x-transition
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
    throw new Error('Sheet component must have exactly two children.')
  }
}

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
)

interface SheetContentProps extends JsxElementProps {
  side?: 'top' | 'bottom' | 'left' | 'right'
}

/**
 * Renders the content of an  sheet.
 *
 * @component
 * @param {PropsWithChildren<SheetContentProps>} props - The props for the SheetContent component.
 * @returns {JSX.Element} The rendered SheetContent component.
 */
function SheetContent({ children, ...props }: PropsWithChildren<SheetContentProps>): JSX.Element {
  const { class: className, side = 'right', ...rest } = props
  return (
    <div
      x-data="{ idSheetTitle: $id('sheet-title'), idSheetDescription: $id('sheet-content') }"
      x-bind:id="$id('sheet-content')"
      x-bind:aria-labelledby="idSheetTitle"
      x-bind:aria-describedby="idSheetDescription"
      x-on:click="event.stopPropagation()"
      x-bind:class="{ '': !open, 'bg-secondary': open }"
      tabindex={1}
      role="Sheet"
      class={cn(sheetVariants({ side }), className)}
      {...rest}
    >
      <div
        x-on:click="open=false"
        class="cursor-pointer absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
      >
        <Icon i="xmark" />
        <span class="sr-only">Close</span>
      </div>
      {children}
    </div>
  )
}

interface SheetDescriptionProps extends JsxElementProps {}

/**
 * Renders the description for an  sheet.
 *
 * @component
 * @example
 * ```tsx
 * <SheetDescription>
 *   This is the description for the  sheet.
 * </SheetDescription>
 * ```
 *
 * @param {PropsWithChildren<SheetDescriptionProps>} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function SheetDescription({
  children,
  ...props
}: PropsWithChildren<SheetDescriptionProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <p
      x-bind:id="idSheetDescription"
      class={cn('text-sm text-muted-foreground', className)}
      {...rest}
      safe
    >
      {children}
    </p>
  )
}

interface SheetFooterProps extends JsxElementProps {}

/**
 * Renders the footer of an  sheet.
 *
 * @param {PropsWithChildren<SheetFooterProps>} props - The props for the SheetFooter component.
 * @returns {JSX.Element} The rendered SheetFooter component.
 */
function SheetFooter({ children, ...props }: PropsWithChildren<SheetFooterProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div
      class={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

interface SheetHeaderProps extends JsxElementProps {}

/**
 * Renders the header of an  sheet.
 *
 * @param {PropsWithChildren<SheetHeaderProps>} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function SheetHeader({ children, ...props }: PropsWithChildren<SheetHeaderProps>): JSX.Element {
  const { class: className, ...rest } = props

  return (
    <div class={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...rest}>
      {children}
    </div>
  )
}

interface SheetTitleProps extends JsxElementProps {}

/**
 * Renders the title of an  sheet.
 *
 * @component
 * @example
 * ```tsx
 * <SheetTitle>This is the title</SheetTitle>
 * ```
 */
function SheetTitle({ children, ...props }: PropsWithChildren<SheetTitleProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <h2
      x-bind:id="idSheetTitle"
      class={cn('text-lg font-semibold text-foreground', className)}
      {...rest}
      safe
    >
      {children}
    </h2>
  )
}

interface SheetTriggerProps extends JsxElementProps {}

/**
 * Renders a trigger element for the Sheet component.
 *
 * @param {PropsWithChildren<SheetTriggerProps>} props - The component props.
 * @returns {JSX.Element} The rendered trigger element.
 */
function SheetTrigger({ children, ...props }: PropsWithChildren<SheetTriggerProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <span x-on:click="open=!open" class={cn('cursor-pointer', className)} {...rest}>
      {children}
    </span>
  )
}

function SheetClose({ children }: PropsWithChildren): JSX.Element {
  return <span x-on:click="open=!open">{children}</span>
}

function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger>Open Sheet</SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
        </SheetHeader>
        <SheetDescription>This is the description for the sheet.</SheetDescription>
        <SheetFooter>
          <SheetClose>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
export {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetDemo,
}
