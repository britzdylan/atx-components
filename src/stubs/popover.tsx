import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import { JsxElementProps } from '#fragments/lib/types'

/**
 * @component Popover (Required)
 * @returns {JSX.Element} The rendered Popover component element.
 *
 * @description The Popover component is a wrapper for the popover.
 * @example <Popover>...</Popover>
 */
function Popover({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div x-data="{ open : false }" class={cn(className)} {...rest}>
      {children}
    </div>
  )
}

/**
 * @component PopoverTrigger (Required)
 * @returns {JSX.Element} The rendered PopoverTrigger component element.
 *
 * @description The PopoverTrigger component is a trigger for the popover.
 * @example <PopoverTrigger>...</PopoverTrigger>
 */
function PopoverTrigger({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <span x-ref="popoverTrigger" x-on:click="open = !open" class={cn(className)} {...rest}>
      {children}
    </span>
  )
}

/**
 * @component PopoverContent (Required)
 * @returns {JSX.Element} The rendered PopoverContent component element.
 *
 * @description The PopoverContent component is a content for the popover.
 * @example <PopoverContent>...</PopoverContent>
 */
function PopoverContent({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <template x-teleport="body">
      <div
        x-show="open"
        x-cloak
        x-anchor="$refs.popoverTrigger"
        x-transition
        attrs={{
          'x-on:click.away': 'open = false',
        }}
        class={cn(
          'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </template>
  )
}

function PopoverDemo(): JSX.Element {
  return (
    <Popover>
      <PopoverTrigger>
        <button>Open popover</button>
      </PopoverTrigger>
      <PopoverContent class="w-80">
        <div class="grid gap-4">
          <div class="space-y-2">
            <h4 class="font-medium leading-none">Dimensions</h4>
            <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          </div>
          <div class="grid gap-2">
            <div class="grid grid-cols-3 items-center gap-4">
              <label for="width">Width</label>
              <input id="width" value="100%" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <label for="maxWidth">Max. width</label>
              <input id="maxWidth" value="300px" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <label for="height">Height</label>
              <input id="height" value="25px" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <label for="maxHeight">Max. height</label>
              <input id="maxHeight" value="none" class="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { Popover, PopoverTrigger, PopoverContent, PopoverDemo }
