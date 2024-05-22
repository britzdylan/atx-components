import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import type { JsxElementProps } from '#fragments/lib/types'

interface SwitchRootProps {
  checked: boolean
  id: string
  name: string
}

interface SwitchThumbProps extends JsxElementProps {
  id: string
}

interface SwitchProps extends JsxElementProps {
  input: SwitchRootProps
  thumbClass?: string
  trackClass?: string
}

function Root({ children, ...props }: PropsWithChildren<SwitchRootProps>) {
  const { checked, id, name, ...rest } = props

  return (
    <div x-data={`{ active: ${checked} }`} {...rest}>
      <input
        id={id}
        name={name}
        checked={checked}
        aria-hidden
        type="checkbox"
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          opacity: 0,
          margin: 0,
          appearance: 'none',
        }}
        class="peer"
        tabindex={-1}
        x-bind:checked="active"
        x-bind:value="active"
      />
      {children}
    </div>
  )
}

function Slide({ children, ...props }: PropsWithChildren<JsxElementProps>) {
  const { class: className } = props
  return (
    <div
      class={[
        cn(
          'inline-flex group h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50'
        ),
        className,
      ]}
      x-on:click="active = !active"
      x-bind:class="active ? 'bg-primary' : 'bg-input'"
    >
      {children}
    </div>
  )
}

function Thumb({ ...props }: SwitchThumbProps) {
  const { id, class: className } = props
  return (
    <label
      for={id}
      class={[
        cn(
          'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform translate-x-0'
        ),
        className,
      ]}
      x-bind:class="!active ? '' : 'translate-x-5'"
    ></label>
  )
}

function Switch({ ...props }: SwitchProps): JSX.Element {
  const { input, thumbClass, trackClass, ...rest } = props

  const rootProps = {
    ...input,
    ...rest,
  }
  return (
    <Root {...rootProps}>
      <Slide class={trackClass}>
        <Thumb id={input.id} class={thumbClass} />
      </Slide>
    </Root>
  )
}

export { Switch }
export type { SwitchProps }
