import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import { JsxElementProps } from '#fragments/lib/types'
import { Icon } from '#components'

interface DialogProps extends JsxElementProps {
  children: [JSX.Element, JSX.Element]
}

/**
 * @component Dialog (Required)
 * @returns {JSX.Element} The rendered Dialog component.
 *
 * @description The Dialog component is used to create a dialog with a trigger and content, requiring two children to be passed in the order of [trigger, content].
 * @example  <Dialog>...</Dialog>
 */
function Dialog({ children: [trigger, content], ...props }: DialogProps): JSX.Element {
  const { class: className, ...rest } = props
  if (trigger && content) {
    return (
      <div x-data="{ open : false }">
        {trigger}
        <template x-teleport="body">
          <div
            x-show="open"
            x-trap="open"
            x-transition
            style="pointer-events: auto;"
            aria-hidden="true"
            x-on:click="open=false"
            attrs={{
              'x-on:keyup.escape': 'open=false',
            }}
            tabindex={1}
            class={cn('fixed inset-0 z-50 bg-black/80', className)}
            {...rest}
          >
            {content}
          </div>
        </template>
      </div>
    )
  } else {
    throw new Error('Dialog component must have exactly two children.')
  }
}

/**
 * @component DialogContent (Required)
 * @returns {JSX.Element} The rendered DialogContent component.
 *
 * @description The DialogContent component is used to create the content for the Dialog component.
 * @example  <DialogContent>...</DialogContent>
 */
function DialogContent({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div
      x-data="{ idDialogTitle: $id('dialog-title'), idDialogDescription: $id('dialog-content') }"
      x-bind:id="$id('dialog-content')"
      x-bind:aria-labelledby="idDialogTitle"
      x-bind:aria-describedby="idDialogDescription"
      x-on:click="event.stopPropagation()"
      tabindex={1}
      role="Dialog"
      class={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

/**
 * @component DialogDescription (Required)
 * @returns {JSX.Element} The rendered DialogDescription component (p).
 *
 * @description The DialogDescription component is used to create a description for the Dialog component.
 * @example  <DialogDescription>...</DialogDescription>
 */
function DialogDescription({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <p
      x-bind:id="idDialogDescription"
      class={cn('text-sm text-muted-foreground', className)}
      {...rest}
      safe
    >
      {children}
    </p>
  )
}

/**
 * @component DialogFooter (Required)
 * @returns {JSX.Element} The rendered DialogFooter component.
 *
 * @description The DialogFooter component is used to create a footer for the Dialog component.
 * @example  <DialogFooter>...</DialogFooter>
 */
function DialogFooter({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
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

/**
 * @component DialogHeader (Required)
 * @returns {JSX.Element} The rendered DialogHeader component.
 *
 * @description The DialogHeader component is used to create a header for the Dialog component.
 * @example  <DialogHeader>...</DialogHeader>
 */
function DialogHeader({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props

  return (
    <div
      class={cn('flex flex-col space-y-2 text-center sm:text-left relative', className)}
      {...rest}
    >
      <Icon class="absolute right-0 top-0 cursor-pointer" x-on:click="open=false" i="xmark" />

      {children}
    </div>
  )
}

/**
 * @component DialogTitle (Required)
 * @returns {JSX.Element} The rendered DialogTitle component (h2).
 *
 * @description The DialogTitle component is used to create a title for the Dialog component, typically used in the header.
 * @example  <DialogTitle>...</DialogTitle>
 */
function DialogTitle({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <h2 x-bind:id="idDialogTitle" class={cn('text-lg font-semibold', className)} {...rest} safe>
      {children}
    </h2>
  )
}

/**
 * @component DialogTrigger (Required)
 * @returns {JSX.Element} The rendered DialogTrigger component.
 *
 * @description The DialogTrigger component is used to create a clickable trigger for the Dialog component.
 * @example  <DialogTrigger>...</DialogTrigger>
 */
function DialogTrigger({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <span x-on:click="open=!open" class={cn('cursor-pointer', className)} {...rest}>
      {children}
    </span>
  )
}

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger>
        <button>Open Dialog</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button>Cancel</button>
          <button>Save</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDemo,
}
