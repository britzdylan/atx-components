import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import type { JsxElementProps } from '#fragments/lib/types'
import { Icon } from '#components'

function CheckboxIndicator({ ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props

  return (
    <span
      x-show="checked"
      x-cloak
      style="pointer-events: none;"
      class={cn('flex items-center justify-center text-current', className)}
      {...rest}
    >
      {props.children}
    </span>
  )
}

interface CheckboxRootProps extends JsxElementProps {
  checked?: boolean
  id: string
  value?: string
}

function CheckboxRoot({ ...props }: PropsWithChildren<CheckboxRootProps>): JSX.Element {
  const { class: className, id, checked = false, value = 'on', ...rest } = props

  return (
    <button
      x-data={`{ checked: ${checked} }`}
      x-on:click="checked = !checked"
      role="checkbox"
      x-bind:aria-checked="checked"
      value={value}
      id={id}
      class={cn(
        'h-4 w-4 shrink-0 rounded-[4px] border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      x-bind:class="checked ? 'bg-primary text-primary-foreground' : ''"
      {...rest}
    >
      {props.children}
    </button>
  )
}

interface CheckBoxProps extends JsxElementProps, CheckboxRootProps {}

/**
 * @component CheckBox (Required)
 * @param {checked} props.checked - The checked state of the checkbox. Default is false.
 * @param {value} props.value - The value of the checkbox. Default is 'on'.
 * @param {id} props.id - The id of the checkbox.
 * @returns {JSX.Element} The rendered CheckBox component.
 *
 * @description The CheckBox component is used to create a clickable checkbox element.
 * @example  <CheckBox id="checkbox">...</CheckBox>
 */
function CheckBox({ ...props }: PropsWithChildren<CheckBoxProps>): JSX.Element {
  const { id, checked = false, value = 'on' } = props

  return (
    <CheckboxRoot id={id} checked={checked} value={value}>
      <CheckboxIndicator>
        <Icon class="h-3 w-3" i="check" />
      </CheckboxIndicator>
    </CheckboxRoot>
  )
}

export { CheckBox }
