import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import type { JsxElementProps } from '#fragments/lib/types'

/**
 * @component Breadcrumb (Required)
 * @requires children: - The Parent element for the Breadcrumb.
 * @returns {JSX.Element} The rendered Breadcrumb component.
 *
 * @description This is the required parent element for the Breadcrumb.
 * @example  <Breadcrumb>...</Breadcrumb>
 */
function Breadcrumb({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props

  return (
    <nav class={cn(className)} aria-label="breadcrumb" {...rest}>
      {children}
    </nav>
  )
}

/**
 * @component BreadcrumbList (Required)
 * @requires children: - The <BreadcrumbItem /> element for the BreadcrumbList.
 * @returns {JSX.Element} The rendered BreadcrumbList component. <ol> element.
 *
 * @description This is the required child element for the <Breadcrumb />.
 * @example  <BreadcrumbList>...</BreadcrumbList>
 */
function BreadcrumbList({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  const styles =
    'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5'
  return (
    <ol class={cn(styles, className)} {...rest}>
      {children}
    </ol>
  )
}

/**
 * @component BreadcrumbItem (Required)
 * @requires children: - any element to be displayed as a BreadcrumbItem.
 * @returns {JSX.Element} The rendered BreadcrumbItem component. <li> element.
 *
 * @description This is the required child element for the <BreadcrumbList />.
 * @example  <BreadcrumbItem>...</BreadcrumbItem>
 */
function BreadcrumbItem({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  const styles = 'inline-flex items-center gap-1.5'
  return (
    <li class={cn(styles, className)} {...rest}>
      {children}
    </li>
  )
}

interface BreadcrumbLinkProps extends JsxElementProps {
  href?: string
  asChild?: boolean
}

/**
 * @component BreadcrumbLink (Required)
 * @param href: - The URL for the BreadcrumbLink.
 * @param asChild: - The boolean value to a custom element instead of an anchor element.
 * @requires children: - The text content for the BreadcrumbLink.
 * @returns {JSX.Element} The rendered BreadcrumbLink component. <a> element.
 *
 * @description This is the required child element for the <BreadcrumbItem />.
 * @example  <BreadcrumbLink>...</BreadcrumbLink>
 */
function BreadcrumbLink({
  children,
  ...props
}: PropsWithChildren<BreadcrumbLinkProps>): JSX.Element {
  const { href, class: className, asChild = false, ...rest } = props
  const styles = 'transition-colors hover:text-foreground'

  if (asChild) {
    return (
      <span class={cn(styles, className)} {...rest}>
        {children}
      </span>
    )
  }

  return (
    <a href={href} class={cn(styles, className)} {...rest} safe>
      {children}
    </a>
  )
}

/**
 * @component BreadcrumbPage (Required)
 * @requires children: - The text content for the BreadcrumbPage.
 * @returns {JSX.Element} The rendered BreadcrumbPage component.
 *
 * @description This is the required child element for the <BreadcrumbItem />.
 * @example  <BreadcrumbPage>...</BreadcrumbPage>
 */
function BreadcrumbPage({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  const styles = 'font-normal text-foreground'
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      class={cn(styles, className)}
      {...rest}
      safe
    >
      {children}
    </span>
  )
}

/**
 * @component BreadcrumbEllipsis (Required)
 * @returns {JSX.Element} The rendered BreadcrumbEllipsis component.
 *
 * @description This is the required child element for the <BreadcrumbList />.
 * @example  <BreadcrumbEllipsis />
 */
function BreadcrumbEllipsis({ ...props }: JsxElementProps): JSX.Element {
  const { class: className, ...rest } = props
  const styles = 'flex h-9 w-9 items-center justify-center'
  return (
    <span role="presentation" aria-hidden="true" class={cn(styles, className)} {...rest}>
      <i class="before:w-4 before:h-4 iconoir-more-horiz"></i>
      <span class="sr-only">More</span>
    </span>
  )
}

/**
 * @component BreadcrumbSeparator (Required)
 * @props children: - The custom element for the BreadcrumbSeparator. Default is an arrow icon.
 * @returns {JSX.Element} The rendered BreadcrumbSeparator component.
 *
 * @description This is the required child element for the <BreadcrumbList />.
 * @example  <BreadcrumbSeparator />  <BreadcrumbSeparator>...</BreadcrumbSeparator>
 */
function BreadcrumbSeparator({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props

  return (
    <li role="presentation" aria-hidden="true" class={cn('[&>svg]:size-3.5', className)} {...rest}>
      {children ?? <i class="before:w-4 before:h-4 iconoir-nav-arrow-right"></i>}
    </li>
  )
}

function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/about">About</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Team</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbEllipsis,
  BreadcrumbSeparator,
  BreadcrumbDemo,
}
