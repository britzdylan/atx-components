import { cn } from '#fragments/lib/utils'
import { JsxElementProps } from '#fragments/lib/types'

const simpleProgress = () => ({
  value: 0,
  get progressBar() {
    return `transform: translateX(-${String(100 - this.value)}%)`
  },
  setup(value: number) {
    this.value = value
  },
})

const progressInterval = () => ({
  setup(value: number, step: number, delay: number) {
    this.value = value

    // @ts-ignore
    this.timer = setInterval(() => {
      this.value += step
      if (this.value >= 100) {
        // @ts-ignore
        clearInterval(this.timer)
      }
    }, delay)
  },
  timer: null,
  value: 0,
  get progressBar() {
    return `transform: translateX(-${100 - this.value}%)`
  },
  destroy() {
    // @ts-ignore
    clearInterval(this.timer)
  },
})

interface ProgressProps extends JsxElementProps {
  value?: number
  step?: number
  delay?: number
  interval?: boolean
  progressClassName?: string
}

/**
 * @component Progress (Required)
 * @prop {number} value The value of the progress bar.
 * @prop {number} step The step is the incrimination of the progress in % of total completion.
 * @prop {number} delay The delay is the time between each incrimination in ms.
 * @prop {boolean} interval Set to false to disable automatic progress incrimination.
 * @returns {JSX.Element} The rendered Progress component element.
 *
 * @description The Progress component is a progress bar.
 * @example <Progress value={50} step={10} delay={500} interval={true} />
 */
function Progress(props: ProgressProps): JSX.Element {
  const { class: className, value = 0, delay = 500, step = 10, interval = true, ...rest } = props

  return (
    <div
      x-data={interval ? `${progressInterval}` : `${simpleProgress}`}
      x-init={`setup(${value}, ${step}, ${delay})`}
      aria-valuemax="100"
      aria-valuemin="0"
      role="progressbar"
      class={cn('relative h-4 overflow-hidden rounded-full bg-secondary w-[60%]', className)}
      {...rest}
    >
      <div
        style={{
          transform: `translateX(-${100 - value}%)`,
        }}
        class={cn('h-full w-full flex-1 bg-primary transition-all', props.progressClassName)}
        x-bind:style="progressBar"
      ></div>
    </div>
  )
}

function ProgressDemo(): JSX.Element {
  return (
    <>
      <Progress value={50} interval={true} progressClassName="bg-primary" />
    </>
  )
}

export { Progress, ProgressDemo }
