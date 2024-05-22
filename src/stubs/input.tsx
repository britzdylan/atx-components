import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import { JsxElementProps } from '#fragments/lib/types'

type TInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week'
  | 'color'
  | 'file'

interface InputProps extends JsxElementProps {
  placeholder: string
  type?: TInputType
}

/**
 * @component Input (Required)
 * @param {placeholder} props.placeholder - The placeholder text for the input.
 * @param {type} props.type - The type of input. Default is 'text'.
 * @returns {JSX.Element} The rendered Input component.
 *
 * @description The Input component is used to create an input element.
 * @example  <Input placeholder="Enter your name" />
 */
function Input({ children, ...props }: PropsWithChildren<InputProps>): JSX.Element {
  const { class: className, type = 'text', placeholder, ...rest } = props
  return (
    <input
      type={type}
      placeholder={placeholder}
      class={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...rest}
    >
      {children}
    </input>
  )
}

export { Input }
