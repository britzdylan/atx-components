import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import { JsxElementProps } from '#fragments/lib/types'

interface LabelProps extends JsxElementProps {
  for: string
}

/**
 * @component Label (Required)
 * @param {for} props.for - The id of the element that the label is for.
 * @returns {JSX.Element} The rendered Label component.
 *
 * @description The Label component is used to create a label element.
 * @example  <Label for="name">Name</Label>
 */
function Label({ children, ...props }: PropsWithChildren<LabelProps>): JSX.Element {
  const { for: htmlFor, class: className, ...rest } = props
  return (
    <label
      for={htmlFor}
      class={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...rest}
    >
      {children}
    </label>
  )
}

export { Label }
