import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import { JsxElementProps } from '#fragments/lib/types'
import { Icon } from '#components'

/**
 * @component Menubar (Required)
 * @returns {JSX.Element} The rendered Menubar component.
 *
 * @description The Menubar component is used to create a menubar element, which is a horizontal bar of menu items.
 * @example  <Menubar for="name">Name</Menubar>
 */
function Menubar({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div
      role="menubar"
      class={cn('flex h-10 items-center space-x-1 rounded-md border bg-background p-1', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

/**
 * @component MenubarMenu (Required)
 * @returns {JSX.Element} The rendered MenubarMenu component.
 *
 * @description The MenubarMenu component is used to create a the menubar menu container element.
 * @example <MenubarMenu>...</MenubarMenu>
 */
function MenubarMenu({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div
      x-data="{ open: false }"
      x-id="['MenuBarMenu','MenuBarTrigger']"
      x-bind:id="$id('MenuBarMenu')"
      class={cn(className)}
      {...rest}
    >
      {children}
    </div>
  )
}

/**
 * @component MenubarTrigger (Required)
 * @returns {JSX.Element} The rendered MenubarTrigger component element.
 *
 * @description The MenubarTrigger component is used to create a menubar trigger element.
 * @example <MenubarTrigger>...</MenubarTrigger>
 */
function MenubarTrigger({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <button
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      x-ref="$id('MenuBarTrigger')"
      tabindex={-1}
      x-bind:id="$id('MenuBarTrigger')"
      x-bind:class="{ 'bg-accent': open, 'text-accent-foreground': open }"
      x-on:click="open = !open"
      attrs={{
        'x-on:click.away': 'open = false',
        'x-on:keydown.escape': 'open = false',
        'x-on:keydown.tab': 'open = false',
        'x-on:mouseout': 'open = false',
      }}
      class={cn(
        'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent hover:bg-accent hover:text-accent-foreground focus:text-accent-foreground',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

/**
 * @component MenubarContent (Required)
 * @returns {JSX.Element} The rendered MenubarContent component element.
 *
 * @description The MenubarContent component is used to create a menubar content container element.
 * @example <MenubarContent>...</MenubarContent>
 */
function MenubarContent({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div
      x-show="open"
      role="menu"
      x-cloak
      aria-labelledby="$id('MenuBarTrigger')"
      x-transition
      x-anchor="$id('MenuBarTrigger')"
      tabindex={-1}
      attrs={{
        'x-on:mouseover': 'open = true',
      }}
      class={cn(
        'z-50 min-w-[12rem]  rounded-md absolute border bg-popover p-1 text-popover-foreground shadow-md',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

interface MenubarItemProps extends JsxElementProps {
  disabled?: boolean
}

/**
 * @component MenubarItem (Required)
 * @param {disabled} props.disabled - Whether the menubar item is disabled.
 * @returns {JSX.Element} The rendered MenubarItem component element.
 *
 * @description The MenubarItem component is used to create a menubar item element.
 * @example <MenubarItem>...</MenubarItem>
 */
function MenubarItem({ children, ...props }: PropsWithChildren<MenubarItemProps>): JSX.Element {
  const { class: className, disabled = false, ...rest } = props
  return (
    <div
      role="menuitem"
      x-bind:class={`{ 'opacity-50 pointer-events-none': ${disabled} }`}
      tabindex={-1}
      class={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent hover:bg-accent focus:text-accent-foreground hover:text-accent-foreground ',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

/**
 * @component MenubarSeparator (Required)
 * @returns {JSX.Element} The rendered MenubarSeparator component element.
 *
 * @description The MenubarSeparator component is used to create a menubar separator element.
 * @example <MenubarSeparator>...</MenubarSeparator>
 */
function MenubarSeparator({ ...props }: JsxElementProps): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div
      role="separator"
      aria-direction="horizontal"
      class={cn('-mx-1 my-1 h-px bg-muted', className)}
      {...rest}
      safe
    ></div>
  )
}

/**
 * @component MenubarShortcut (Required)
 * @returns {JSX.Element} The rendered MenubarShortcut component element.
 *
 * @description The MenubarShortcut component is used to create a menubar shortcut element, display only.
 * @example <MenubarShortcut>...</MenubarShortcut>
 */
function MenubarShortcut({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <span class={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)} {...rest}>
      {children}
    </span>
  )
}

/**
 * @component MenubarLabel (Required)
 * @returns {JSX.Element} The rendered MenubarLabel component element.
 *
 * @description The MenubarLabel component is used to create a menubar label element.
 * @example <MenubarLabel>...</MenubarLabel>
 */
function MenubarLabel({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div class={cn('px-2 py-1.5 text-sm font-semibold', className)} {...rest} safe>
      {children}
    </div>
  )
}

interface MenubarCheckboxItemProps extends JsxElementProps {
  disabled?: boolean
  checked?: boolean
}

/**
 * @component MenubarCheckboxItem (Required)
 * @param {disabled} props.disabled - Whether the menubar checkbox item is disabled.
 * @param {checked} props.checked - Whether the menubar checkbox item is checked.
 * @returns {JSX.Element} The rendered MenubarCheckboxItem component element.
 *
 * @description The MenubarCheckboxItem component is used to create a menubar checkbox item element.
 * @example <MenubarbCheckboxItem>...</MenubarCheckboxItem>
 */
function MenubarCheckboxItem({
  children,
  ...props
}: PropsWithChildren<MenubarCheckboxItemProps>): JSX.Element {
  const { class: className, disabled = false, checked = false, ...rest } = props
  return (
    <div
      role="menuitemcheckbox"
      tabindex={-1}
      aria-checked={checked}
      class={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent hover:bg-accent focus:text-accent-foreground hover:text-accent-foreground',
        className,
        disabled ? 'opacity-50 pointer-events-none' : ''
      )}
      {...rest}
    >
      {checked ? (
        <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <Icon i="check" class="h-4 w-4" />
        </span>
      ) : null}
      {children}
    </div>
  )
}

interface MenubarRadioGroupProps extends JsxElementProps {
  value?: string
}

/**
 * @component MenubarRadioGroup (Required)
 * @param {value} props.value - The default value of the menubar radio group.
 * @returns {JSX.Element} The rendered MenubarCheckboxItem component element.
 *
 * @description The MenubarRadioGroup component is used to create a menubar radio group element.
 * @example <MenubarRadioGroup>...</MenubarCheckboxItem>
 */
function MenubarRadioGroup({
  children,
  ...props
}: PropsWithChildren<MenubarRadioGroupProps>): JSX.Element {
  const { class: className, value = null, ...rest } = props
  return (
    <div x-data={`{ selected: '${value}' }`} role="group" class={cn(className)} {...rest}>
      {children}
    </div>
  )
}

interface MenubarRadioItemProps extends JsxElementProps {
  disabled?: boolean
  value?: string
}

/**
 * @component MenubarRadioItem (Required)
 * @param {disabled} props.disabled - Whether the menubar radio item is disabled.
 * @param {value} props.value - The value of the menubar radio item.
 * @returns {JSX.Element} The rendered MenubarRadioItem component element.
 *
 * @description The MenubarRadioItem component is used to create a menubar radio item element.
 * @example <MenubarRadioItem>...</MenubarRadioItem>
 */
function MenubarRadioItem({
  children,
  ...props
}: PropsWithChildren<MenubarRadioItemProps>): JSX.Element {
  const { class: className, disabled = false, value, ...rest } = props
  return (
    <div
      x-on:click={`selected = '${value}'`}
      role="menuitemcheckbox"
      tabindex={-1}
      class={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground',
        className,
        disabled ? 'opacity-50 pointer-events-none' : ''
      )}
      {...rest}
    >
      <span
        x-show={`selected === '${value}'`}
        class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
      >
        <div class="h-2 w-2 bg-black rounded-full" />
      </span>

      {children}
    </div>
  )
}

/**
 * @component MenubarSub (Required)
 * @returns {JSX.Element} The rendered MenubarSub component element.
 *
 * @description The MenubarSub component is used to create a menubar sub container element.
 * @example <MenubarSub>...</MenubarSub>
 */
function MenubarSub({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div x-id="['MenubarSubTrigger']" class={cn('group relative', className)} {...rest}>
      {children}
    </div>
  )
}

/**
 * @component MenubarSubTrigger (Required)
 * @returns {JSX.Element} The rendered MenubarSubTrigger component element.
 *
 * @description The MenubarSubTrigger component is used to create a menubar sub trigger element.
 * @example <MenubarSubTrigger>...</MenubarSubTrigger>
 */
function MenubarSubTrigger({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div
      role="menuitem"
      aria-haspopup="menu"
      x-ref="$id('MenubarSubTrigger')"
      tabindex={-1}
      x-bind:id="$id('MenubarSubTrigger')"
      class={cn(
        'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent group-hover:bg-accent focus:text-accent-foreground group-hover:text-accent-foreground',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

/**
 * @component MenubarSubContent (Required)
 * @returns {JSX.Element} The rendered MenubarSubContent component element.
 *
 * @description The MenubarSubContent component is used to create a menubar sub content container element.
 * @example <MenubarSubContent>...</MenubarSubContent>
 */
function MenubarSubContent({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div
      role="menu"
      x-cloak
      aria-labelledby="$id('MenubarSubTrigger')"
      x-transition
      x-anchor="$id('MenubarSubTrigger')"
      tabindex={-1}
      class={cn(
        'z-50 min-w-[12rem] right-[-100%] top-0 overflow-hidden rounded-md absolute border bg-popover p-1 text-popover-foreground shadow-md hidden group-hover:block',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>Always Show Full URLs</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Toggle Fullscreen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Hide Sidebar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem>Edit...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarShortcut,
  MenubarLabel,
  MenubarSeparator,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarRadioGroup,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarDemo,
}
