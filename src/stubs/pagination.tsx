import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import { JsxElementProps } from '#fragments/lib/types'
import { buttonVariants } from '#components'
import { Icon } from '#components'

/**
 * @component Pagination (Required)
 * @returns {JSX.Element} The rendered Pagination component element.
 *
 * @description The Pagination component is a wrapper for the pagination component.
 * @example <Pagination>...</Pagination>
 */
function Pagination({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      class={cn('mx-auto flex w-full justify-center', className)}
      {...rest}
    >
      {children}
    </nav>
  )
}

/**
 * @component PaginationContent (Required)
 * @returns {JSX.Element} The rendered PaginationContent component element.
 *
 * @description The PaginationContent component is a wrapper for the pagination content.
 * @example <PaginationContent>...</PaginationContent>
 */
function PaginationContent({
  children,
  ...props
}: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <ul class={cn('flex flex-row items-center gap-1', className)} {...rest}>
      {children}
    </ul>
  )
}

/**
 * @component PaginationItem (Required)
 * @returns {JSX.Element} The rendered PaginationItem component element.
 *
 * @description The PaginationItem component is a wrapper for the pagination item.
 * @example <PaginationItem>...</PaginationItem>
 */
function PaginationItem({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <li class={cn('cursor-pointer', className)} {...rest}>
      {children}
    </li>
  )
}

interface PaginationLinkProps extends JsxElementProps {
  href: string
  active?: boolean
  size?: 'icon' | 'default' | 'sm' | 'lg' | null | undefined
}

/**
 * @component PaginationLink (Required)
 * @prop {string} href The href attribute for the pagination link.
 * @prop {boolean} active The active state of the pagination link.
 * @prop {string} size The size of the pagination link.
 * @returns {JSX.Element} The rendered PaginationLink component element.
 *
 * @description The PaginationLink component is a link for the pagination.
 * @example <PaginationLink>...</PaginationLink>
 */
function PaginationLink({
  children,
  ...props
}: PropsWithChildren<PaginationLinkProps>): JSX.Element {
  const { class: className, active = false, size = 'icon', href, ...rest } = props
  return (
    <a
      href={href}
      aria-current={active ? 'page' : undefined}
      class={cn(
        buttonVariants({
          variant: active ? 'outline' : 'ghost',
          size,
        }),
        className
      )}
      {...rest}
    >
      {children}
    </a>
  )
}

interface PaginationPreviousNextProps extends JsxElementProps {
  href: string
}

/**
 * @component PaginationPrevious (Required)
 * @prop {string} href The href attribute for the previous pagination link.
 * @returns {JSX.Element} The rendered PaginationPrevious component element.
 *
 * @description The PaginationPrevious component is a link for the previous pagination.
 * @example <PaginationPrevious>...</PaginationPrevious>
 */
function PaginationPrevious({
  children,
  ...props
}: PropsWithChildren<PaginationPreviousNextProps>): JSX.Element {
  const { class: className, href, ...rest } = props
  return (
    <PaginationLink
      href={href}
      aria-label="Go to previous page"
      size="default"
      class={cn('gap-1 pl-2.5', className)}
      {...rest}
    >
      <Icon i="nav-arrow-left" class="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  )
}

/**
 * @component PaginationNext (Required)
 * @prop {string} href The href attribute for the next pagination link.
 * @returns {JSX.Element} The rendered PaginationNext component element.
 *
 * @description The PaginationNext component is a link for the next pagination.
 * @example <PaginationNext>...</PaginationNext>
 */
function PaginationNext({
  children,
  ...props
}: PropsWithChildren<PaginationPreviousNextProps>): JSX.Element {
  const { class: className, href, ...rest } = props
  return (
    <PaginationLink
      href={href}
      aria-label="Go to next page"
      size="default"
      class={cn('gap-1 pr-2.5', className)}
      {...rest}
    >
      <span>Next</span>
      <Icon i="nav-arrow-right" class="h-4 w-4" />
    </PaginationLink>
  )
}

/**
 * @component PaginationEllipsis (Required)
 * @returns {JSX.Element} The rendered PaginationEllipsis component element.
 *
 * @description The PaginationEllipsis component is a wrapper for the pagination ellipsis.
 * @example <PaginationEllipsis>...</PaginationEllipsis>
 */
function PaginationEllipsis({ ...props }: JsxElementProps): JSX.Element {
  const { class: className, ...rest } = props

  return (
    <span aria-hidden class={cn('flex h-9 w-9 items-center justify-center', className)} {...rest}>
      <Icon i="more-horiz" class="h-4 w-4" />
      <span class="sr-only">More pages</span>
    </span>
  )
}

function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" active>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationDemo
}
