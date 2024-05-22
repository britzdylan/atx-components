import { cn } from '#fragments/lib/utils'
import { JsxElementProps } from '#fragments/lib/types'

function Skeleton({ class: className, ...props }: JsxElementProps) {
  return <div class={cn('animate-pulse rounded-md bg-muted', className)} {...props}></div>
}

function SkeletonDemo() {
  return (
    <div class="flex items-center space-x-4">
      <Skeleton class="h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]" />
        <Skeleton class="h-4 w-[200px]" />
      </div>
    </div>
  )
}

export { Skeleton, SkeletonDemo }
