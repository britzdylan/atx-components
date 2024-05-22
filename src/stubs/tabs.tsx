import { PropsWithChildren } from 'adonisjsx'
import { cn } from '#fragments/lib/utils'
import { JsxElementProps } from '#fragments/lib/types'

interface TabsProps extends JsxElementProps {
  activeTab?: number
}

const tabsData = (defaultTab: number) => ({
  init() {
    this.activeTab = defaultTab
  },
  activeTab: 0,
  setActiveTab(index: number) {
    this.activeTab = index
  },
})

interface TabsProps extends JsxElementProps {
  defaultTab: number
}

function Tabs({ children, ...props }: PropsWithChildren<TabsProps>): JSX.Element {
  const { class: className, defaultTab = 0, ...rest } = props

  return (
    <div x-data={`tabsData(${defaultTab})`} class={cn('relative', className)} {...rest}>
      {children}
    </div>
  )
}

function TabsList({ children, ...props }: PropsWithChildren<JsxElementProps>): JSX.Element {
  const { class: className, ...rest } = props
  return (
    <div
      role="tablist"
      tabindex={0}
      style="outline: none;"
      class={cn(
        'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

interface TabProps extends JsxElementProps {
  value: number
}

function TabsTrigger({ children, ...props }: PropsWithChildren<TabProps>): JSX.Element {
  const { class: className, value = false, ...rest } = props
  return (
    <button
      role="tab"
      tabindex={0}
      x-on:click={`setActiveTab(${value})`}
      attrs={{
        'x-bind:aria-selected': `${value} === activeTab`,
        'x-bind:data-state': `${value} === activeTab ? 'active' : 'inactive'`,
      }}
      class={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

function TabsContent({ children, ...props }: PropsWithChildren<TabProps>): JSX.Element {
  const { class: className, value = false, ...rest } = props
  return (
    <div
      role="tabpanel"
      x-cloak
      attrs={{
        'x-show': `${value} === activeTab`,
        'x-bind:aria-hidden': `${value} !== activeTab`,
        'x-bind:data-state': `${value} === activeTab ? 'active' : 'inactive'`,
      }}
      class={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

function TabsDemo() {
  return (
    <Tabs defaultTab={0} class="w-[400px]">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value={0}>Account</TabsTrigger>
        <TabsTrigger value={1}>Password</TabsTrigger>
      </TabsList>
      <TabsContent value={0}>Tab 1 Content</TabsContent>
      <TabsContent value={1}>Tab 2 Content</TabsContent>
    </Tabs>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsDemo, tabsData }
