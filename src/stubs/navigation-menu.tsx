import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import { JsxElementProps } from '#fragments/lib/types'
import { Icon } from '#components'

/**
 * @component NavigationMenu (Required)
 * @returns {JSX.Element} The rendered NavigationMenu component element.
 *
 * @description The NavigationMenu component is a wrapper for the navigation menu.
 * @example <NavigationMenu>...</MenubarCheckboxItem>
 */
function NavigationMenu({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <nav
      aria-label="Main"
      dir="ltr"
      x-ref="navigationMenu"
      class={cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
      {...rest}
    >
      <div style="position: relative;">{children}</div>
    </nav>
  )
}

/**
 * @component NavigationMenuTrigger (Required)
 * @returns {JSX.Element} The rendered NavigationMenuTrigger component element.
 *
 * @description The NavigationMenuTrigger component is a button that triggers the navigation menu.
 * @example <NavigationMenuTrigger>...</NavigationMenuTrigger>
 */
function NavigationMenuTrigger({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props

  const style =
    'inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
  return (
    <button class={cn(style, className)} {...rest}>
      {children}
      <Icon
        i="nav-arrow-down"
        class="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-hover:rotate-180"
        aria-hidden="true"
      />
    </button>
  )
}

/**
 * @component NavigationMenuItem (Required)
 * @returns {JSX.Element} The rendered NavigationMenuItem component element.
 *
 * @description The NavigationMenuItem component is a list item for the navigation menu.
 * @example <NavigationMenuItem>...</NavigationMenuItem>
 */
function NavigationMenuItem({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <li class={cn('group', className)} {...rest}>
      {children}
    </li>
  )
}

/**
 * @component NavigationMenuContent (Required)
 * @returns {JSX.Element} The rendered NavigationMenuContent component element.
 *
 * @description The NavigationMenuContent component is a container for the navigation menu content.
 * @example <NavigationMenuContent>...</NavigationMenuContent>
 */
function NavigationMenuContent({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props

  return (
    <div
      x-transition
      x-anchor="$refs.navigationMenu"
      class={cn(
        'w-full md:absolute md:w-auto opacity-0 pointer-events-none h-0 transform translate-x-5 group-hover:translate-x-0 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:h-max hover:opacity-100 transition-all duration-150 ease-in',
        className
      )}
      {...rest}
    >
      <div class="origin-top-center relative mt-1.5  w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg">
        {children}
      </div>
    </div>
  )
}

interface NavigationMenuLinkProps extends JsxElementProps {
  href: string
  title: string
}

/**
 * @component NavigationMenuLink (Required)
 * @prop {string} href The URL of the link.
 * @prop {string} title The title of the link.
 * @returns {JSX.Element} The rendered NavigationMenuLink component element.
 *
 * @description The NavigationMenuLink component is a link for the navigation menu.
 * @example <NavigationMenuLink href="/" title="Home">Home</NavigationMenuLink>
 */
function NavigationMenuLink({
  children,
  ...props
}: PropsWithChildren<NavigationMenuLinkProps>): JSX.Element {
  const { class: className, href, title, ...rest } = props

  return (
    <a
      href={href}
      title={title}
      class={cn(
        'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...rest}
    >
      {children}
    </a>
  )
}

/**
 * @component NavigationMenuList (Required)
 * @returns {JSX.Element} The rendered NavigationMenuList component element.
 *
 * @description The NavigationMenuList component is a list for the navigation menu.
 * @example <NavigationMenuList>...</NavigationMenuList>
 */
function NavigationMenuList({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props

  return (
    <ul
      dir="ltr"
      class={cn('flex flex-1 list-none items-center justify-center space-x-1', className)}
      {...rest}
    >
      {children}
    </ul>
  )
}

/**
 * @component NavigationMenuIndicator (Required)
 * @returns {JSX.Element} The rendered NavigationMenuIndicator component element.
 *
 * @description The NavigationMenuIndicator component is an indicator for the navigation menu.
 * @example <NavigationMenuIndicator>...</NavigationMenuIndicator>
 */
function NavigationMenuIndicator({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <span
      class={cn(
        'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
        className
      )}
      {...rest}
    >
      {children}
      <div class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </span>
  )
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]

function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li class="row-span-3">
                <a
                  class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href="/"
                >
                  <div class="mb-2 text-lg font-medium">shadcn/ui</div>
                  <p class="text-sm leading-tight text-muted-foreground">
                    Beautifully designed components that you can copy and paste into your apps.
                    Accessible. Customizable. Open Source.
                  </p>
                </a>
              </li>
              <li title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </li>
              <li title="Installation">How to install dependencies and structure your app.</li>
              <li title="Typography">Styles for headings, paragraphs, lists...etc</li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <li title={component.title}>{component.description}</li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink title="" href="/">
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuDemo,
}
