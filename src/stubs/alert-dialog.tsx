import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import { JsxElementProps } from '#fragments/lib/types'

interface AlertDialogProps extends JsxElementProps {
  children: [JSX.Element, JSX.Element]
}

/**
 * @component AlertDialog (Required)
 * @requires children: [trigger, content] - The trigger and content elements for the AlertDialog, expects exactly two children.
 * @returns {JSX.Element} The rendered AlertDialog component.
 *
 * @description This is the main root element for the AlertDialog.
 * @example  <AlertDialog>...</AlertDialog>
 */
function AlertDialog({ children: [trigger, content], ...props }: AlertDialogProps): JSX.Element {
  const { class: className, ...rest } = props
  if (trigger && content) {
    return (
      <div x-data="{ open : false }">
        {trigger}
        <template x-teleport="body">
          <div
            x-show="open"
            x-transition
            style="pointer-events: auto;"
            aria-hidden="true"
            class={cn('fixed inset-0 z-50 bg-black/80', className)}
            {...rest}
          >
            {content}
          </div>
        </template>
      </div>
    )
  } else {
    throw new Error('AlertDialog component must have exactly two children.')
  }
}

/**
 * @component AlertDialogAction (Required)
 * @requires children - Any element that will be used as the action button.
 * @returns {JSX.Element} The rendered AlertDialogAction component.
 *
 * @description  This is the action element for the AlertDialog, and is responsible for handling the action when the user clicks on it.
 * @example  <AlertDialogAction>...</AlertDialogAction>
 */
function AlertDialogAction({ children }: PropsWithChildren): JSX.Element {
  return <span x-on:click="open=!open">{children}</span>
}

/**
 * @component AlertDialogCancel (Required)
 * @requires children - Any element that will be used as the cancel button.
 * @returns {JSX.Element} The rendered AlertDialogCancel component.
 *
 * @description   This is the cancel element for the AlertDialog, and is responsible for closing the AlertDialog when the user clicks on it.
 * @example  <AlertDialogCancel>...</AlertDialogCancel>
 */
function AlertDialogCancel({ children }: PropsWithChildren): JSX.Element {
  return <span x-on:click="open=!open">{children}</span>
}

/**
 * @component AlertDialogContent (Required)
 * @requires children - <AlertDialogHeader>, <AlertDialogDescription>, <AlertDialogFooter>
 * @returns {JSX.Element} The rendered AlertDialogContent component.
 *
 * @description This is the content element for the AlertDialog, and is responsible for displaying the content of the AlertDialog.
 * @example  <AlertDialogContent>...</AlertDialogContent>
 */
function AlertDialogContent({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div
      x-data="{ idDialogTitle: $id('alert-dialog-title'), idDialogDescription: $id('alert-dialog-content') }"
      x-bind:id="$id('alert-dialog-content')"
      x-bind:aria-labelledby="idDialogTitle"
      x-bind:aria-describedby="idDialogDescription"
      tabindex={1}
      role="alertdialog"
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
 * @component AlertDialogDescription (Required)
 * @requires children - Text content for the description.
 * @returns {JSX.Element} The rendered AlertDialogDescription component.
 *
 * @description This is the description element for the AlertDialog, and is responsible for displaying most of the content of the AlertDialog.
 * @example  <AlertDialogDescription>...</AlertDialogDescription>
 */
function AlertDialogDescription({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <p
      x-bind:id="idDialogDescription"
      class={cn('text-sm text-muted-foreground', className)}
      {...rest}
    >
      {children}
    </p>
  )
}

/**
 * @component AlertDialogFooter (Required)
 * @requires children - <AlertDialogAction>, <AlertDialogCancel>
 * @returns {JSX.Element} The rendered AlertDialogFooter component.
 *
 * @description This is the footer element for the AlertDialog, and is responsible for displaying the footer content of the AlertDialog.
 * @example  <AlertDialogFooter>...</AlertDialogFooter>
 */
function AlertDialogFooter({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
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
 * @component AlertDialogHeader (Required)
 * @requires children - <AlertDialogTitle>
 * @returns {JSX.Element} The rendered AlertDialogHeader component.
 *
 * @description  This is the header element for the AlertDialog, and is responsible for displaying the header content of the AlertDialog.
 * @example  <AlertDialogHeader>...</AlertDialogHeader>
 */
function AlertDialogHeader({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props

  return (
    <div class={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...rest}>
      {children}
    </div>
  )
}

/**
 * @component AlertDialogTitle (Required)
 * @requires children - Text content for the title.
 * @returns {JSX.Element} The rendered AlertDialogTitle component.
 *
 * @description This is the title element for the AlertDialog, and is responsible for displaying the title of the AlertDialog.
 * @example  <AlertDialogTitle>...</AlertDialogTitle>
 */
function AlertDialogTitle({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <h2 x-bind:id="idDialogTitle" class={cn('text-lg font-semibold', className)} {...rest}>
      {children}
    </h2>
  )
}

/**
 * @component AlertDialogTrigger (Required)
 * @requires children - Any element that will be used as the trigger.
 * @returns {JSX.Element} The rendered AlertDialogTrigger component.
 *
 * @description This is the trigger element for the AlertDialog, and is responsible for opening the AlertDialog when the user clicks on it.
 * @example  <AlertDialogTrigger>...</AlertDialogTrigger>
 */
function AlertDialogTrigger({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <span x-on:click="open=!open" class={cn('cursor-pointer', className)} {...rest}>
      {children}
    </span>
  )
}

function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Trigger</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Title</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>Description</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction>Action</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDemo,
}
