import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import type { JsxElementProps } from '#fragments/lib/types'

/**
 * @component AvatarFallback (Required)
 * @requires children: - The Fallback text for the Avatar.
 * @returns {JSX.Element} The rendered AvatarFallback component.
 *
 * @description This is the Fallback element for the Avatar, and is responsible for displaying the Fallback text of the Avatar.
 * @example  <AvatarFallback>...</AvatarFallback>
 */
function AvatarFallback({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className } = props
  return (
    <div
      class={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}
    >
      {children}
    </div>
  )
}

interface AvatarImageProps extends JsxElementProps {
  src: string
  alt: string
}

/**
 * @component AvatarImage (Required)
 * @param src: - The source of the image.
 * @param alt: - The alt text for the image.
 * @returns {JSX.Element} The rendered AvatarImage component.
 *
 * @description This is the image element for the Avatar, and is responsible for displaying the image of the Avatar.
 * @example  <AvatarImage>...</AvatarImage>
 */
function AvatarImage({ children, ...props }: PropsWithChildren<AvatarImageProps>): JSX.Element {
  const { class: className, src, alt, ...rest } = props
  return <img src={src} alt={alt} class={cn('aspect-square h-full w-full', className)} {...rest} />
}

/**
 * @component Avatar (Required)
 * @requires children: - The Parent element for the Avatar.
 * @returns {JSX.Element} The rendered Avatar component.
 *
 * @description This is the Avatar element for the Avatar, and is responsible for displaying the Avatar.
 * @example  <Avatar>...</Avatar>
 */
function Avatar({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className } = props
  return (
    <span class={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}>
      {children}
    </span>
  )
}

function AvatarDemo() {
  return (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  )
}

export { AvatarFallback, AvatarImage, Avatar, AvatarDemo }
