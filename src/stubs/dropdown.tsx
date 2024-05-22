import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import { JsxElementProps } from '#fragments/lib/types'
import { Icon } from '#components'

/**
 * @component DropdownMenu (Required)
 * @returns {JSX.Element} The rendered DropdownMenu component.
 *
 * @description The DropdownMenu component is used to create a dropdown menu.
 * @example  <DropdownMenu>...</DropdownMenu>
 */
function DropdownMenu({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  return (
    <div
      x-data="{ open : false }"
      attrs={{
        'x-on:click.away': 'open=false',
        'x-on:keydown.escape': 'open=false',
      }}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * @component DropdownMenuTrigger (Required)
 * @returns {JSX.Element} The rendered DropdownMenuTrigger component.
 *
 * @description The DropdownMenuTrigger component is used to create a trigger for the DropdownMenu component.
 * @example  <DropdownMenuTrigger>...</DropdownMenuTrigger>
 */
function DropdownMenuTrigger({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <span
      x-ref="dropDownTrigger"
      x-on:click="open=!open"
      class={cn('cursor-pointer', className)}
      {...rest}
    >
      {children}
    </span>
  )
}

/**
 * @component DropdownMenuContent (Required)
 * @returns {JSX.Element} The rendered DropdownMenuContent component.
 *
 * @description The DropdownMenuContent component is used to create the content for the DropdownMenu component.
 * @example  <DropdownMenuContent>...</DropdownMenuContent>
 */
function DropdownMenuContent({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  const styles =
    'z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md'
  return (
    <div
      x-show="open"
      x-transition
      attrs={{ 'x-anchor.offset.15': '$refs.dropDownTrigger' }}
      role="menu"
      tabindex={-1}
      class={cn(styles, className)}
      {...rest}
    >
      {children}
    </div>
  )
}

/**
 * @component DropdownMenuGroup (Required)
 * @returns {JSX.Element} The rendered DropdownMenuGroup component.
 *
 * @description The DropdownMenuGroup component is used to group items within the DropdownMenu component.
 * @example  <DropdownMenuGroup>...</DropdownMenuGroup>
 */
function DropdownMenuGroup({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div role="group" class={cn(className)} {...rest}>
      {children}
    </div>
  )
}

/**
 * @component DropdownMenuLabel (Required)
 * @returns {JSX.Element} The rendered DropdownMenuLabel component.
 *
 * @description The DropdownMenuLabel component is used to create a label for the DropdownMenuContent component.
 * @example  <DropdownMenuLabel>...</DropdownMenuLabel>
 */
function DropdownMenuLabel({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div class={cn('px-2 py-1.5 text-sm font-semibold', className)} {...rest} safe>
      {children}
    </div>
  )
}

/**
 * @component DropdownMenuSeparator (Required)
 * @returns {JSX.Element} The rendered DropdownMenuSeparator component.
 *
 * @description The DropdownMenuSeparator component is used to create a separator within the DropdownMenuContent component.
 * @example  <DropdownMenuSeparator>...</DropdownMenuSeparator>
 */
function DropdownMenuSeparator({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div
      role="separator"
      aria-direction="horizontal"
      class={cn('-mx-1 my-1 h-px bg-muted', className)}
      {...rest}
    ></div>
  )
}

interface DropdownMenuItemProps extends JsxElementProps {
  disabled?: boolean
}

/**
 * @component DropdownMenuItem (Required)
 * @param {disabled} props.disabled - The disabled state of the item. Default is false.
 * @returns {JSX.Element} The rendered DropdownMenuItem component.
 *
 * @description The DropdownMenuItem component is used to create an item within the DropdownMenuContent component.
 * @example  <DropdownMenuItem>...</DropdownMenuItem>
 */
function DropdownMenuItem({
  children,
  ...props
}: PropsWithChildren<DropdownMenuItemProps>): JSX.Element {
  const { class: className, disabled = false, ...rest } = props

  const defaultStyles =
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
  const disabledStyles = disabled ? 'pointer-events-none opacity-50' : ''
  const styles = `${defaultStyles} ${disabledStyles}`

  return (
    <div role="menuItem" tabindex={-1} class={cn(styles, className)} {...rest}>
      {children}
    </div>
  )
}

/**
 * @component DropdownMenuShortcut (Required)
 * @returns {JSX.Element} The rendered DropdownMenuShortcut component.
 *
 * @description The DropdownMenuShortcut component is used to create a shortcut for the DropdownMenuItem component (Display only).
 * @example  <DropdownMenuShortcut>...</DropdownMenuShortcut>
 */
function DropdownMenuShortcut({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <span class={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...rest} safe>
      {children}
    </span>
  )
}

/**
 * @component DropdownMenuSub (Required)
 * @returns {JSX.Element} The rendered DropdownMenuSub component.
 *
 * @description The DropdownMenuSub component is used to create a sub-menu within the DropdownMenuContent component.
 * @example  <DropdownMenuSub>...</DropdownMenuSub>
 */
function DropdownMenuSub({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  return (
    <div class="relative group" x-id="['sub-menu']" {...props}>
      {children}
    </div>
  )
}

/**
 * @component DropdownMenuSubTrigger (Required)
 * @returns {JSX.Element} The rendered DropdownMenuSubTrigger component.
 *
 * @description The DropdownMenuSubTrigger component is used to create a trigger for the DropdownMenuSub component.
 * @example  <DropdownMenuSubTrigger>...</DropdownMenuSubTrigger>
 */
function DropdownMenuSubTrigger({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  const defaultStyles =
    'flex cursor-default select-none  items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent hover:bg-accent hover:text-accent-foreground focus:text-accent-foreground transition-colors'
  return (
    <div
      aria-haspopup="menu"
      aria-expanded="false"
      tabindex={-1}
      aria-controls="subMenu"
      class={cn(defaultStyles, className)}
      x-bind:class={`'bg-accent' : subOpen`}
      x-on:click="subOpen=!subOpen"
      {...rest}
    >
      {children}
      <Icon i="nav-arrow-right" class="ml-auto h-4 w-4" />
    </div>
  )
}

/**
 * @component DropdownMenuSubContent (Required)
 * @returns {JSX.Element} The rendered DropdownMenuSubContent component.
 *
 * @description The DropdownMenuSubContent component is used to create the content for the DropdownMenuSub component.
 * @example  <DropdownMenuSubContent>...</DropdownMenuSubContent>
 */
function DropdownMenuSubContent({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props

  const styles =
    'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg absolute  top-0 right-[-60%] hidden group-hover:block'

  return (
    <div x-transition role="menu" tabindex={-1} class={cn(styles, className)} {...rest}>
      {children}
    </div>
  )
}

export {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
}
