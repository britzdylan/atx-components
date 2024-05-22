import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import { JsxElementProps } from '#fragments/lib/types'

const radioGroupData = () => ({
  value: '',
  setValue(value: string) {
    this.value = value
  },
  getValue() {
    return this.value
  },
})

interface RadioGroupProps extends JsxElementProps {
  defaultValue: string
}

/**
 * @component RadioGroup (Required)
 * @prop {string} defaultValue The default value of the RadioGroup.
 * @returns {JSX.Element} The rendered RadioGroup component element.
 *
 * @description The RadioGroup component is a group of radio buttons.
 * @example <RadioGroup defaultValue="comfortable">...</RadioGroup>
 */
function RadioGroup({ children, ...props }: PropsWithChildren<RadioGroupProps>): JSX.Element {
  const { class: className, defaultValue, ...rest } = props

  return (
    <div
      x-data={`${radioGroupData}`}
      x-init={`setValue('${defaultValue}')`}
      role="radiogroup"
      dir="ltr"
      tabindex={0}
      style="outline: none;"
      class={cn('grid gap-2', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

interface RadioGroupItemProps extends JsxElementProps {
  value: string
  id: string
}

/**
 * @component RadioGroupItem (Required)
 * @prop {string} value The value of the RadioGroupItem.
 * @prop {string} id The id of the RadioGroupItem.
 * @returns {JSX.Element} The rendered RadioGroupItem component element.
 *
 * @description The RadioGroupItem component is a radio button item.
 * @example <RadioGroupItem value="default" id="r1" />
 */
function RadioGroupItem({ ...props }: RadioGroupItemProps): JSX.Element {
  const { class: className, value, id, ...rest } = props
  return (
    <button
      x-on:click={`setValue('${value}')`}
      role="radio"
      aria-checked="false"
      id={id}
      value={value}
      tabindex={-1}
      class={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...rest}
    >
      <span x-show={`value === '${value}'`} x-cloak class="flex items-center justify-center">
        <div class="h-2.5 w-2.5 fill-current text-current bg-current rounded-full" />
      </span>
    </button>
  )
}

function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div class="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <label for="r1">Default</label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <label for="r2">Comfortable</label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <label for="r3">Compact</label>
      </div>
    </RadioGroup>
  )
}

export { RadioGroup, RadioGroupItem, RadioGroupDemo }
