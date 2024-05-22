import {
  PopoverDemo,
  ProgressDemo,
  RadioGroupDemo,
  SelectDemo,
  SheetDemo,
  TableDemo,
  TabsDemo,
  AccordionDemo,
  AccordionSelfDemo,
  TextArea,
  AlertDialogDemo,
  AlertDemo,
  AvatarDemo,
  BadgeDemo,
  BreadcrumbDemo,
  CardDemo,
  CollapsibleDemo,
  DialogDemo,
  DrawerDemo,
  MenubarDemo,
  NavigationMenuDemo,
  PaginationDemo
} from '#components'

export default function Home() {
  return (
    <div class="relative  ">
      <div class="flex flex-col items-center py-24 z-10 relative">
        <h2 class="text-lg font-semibold leading-8  ">AlpineJs Example with HMR</h2>
        <div class="py-4 inline-flex gap-2 items-center mx-auto" x-data="{ count: 0 }">
          <p>
            Count: <span x-text="count"></span>
          </p>
        </div>
        <div class="flex flex-col gap-10 w-full justify-center items-center max-w-screen-lg mx-auto">
          <PopoverDemo />
          <PaginationDemo />
          <NavigationMenuDemo />
          <MenubarDemo />
          <DrawerDemo />
          <BadgeDemo />
          <AvatarDemo />
          <ProgressDemo />
          <RadioGroupDemo />
          <SelectDemo />
          <SheetDemo />
          <TableDemo />
          <TabsDemo />
          <TextArea disabled />
          <AccordionDemo />
          <AccordionSelfDemo />
          <AlertDialogDemo />
          <AlertDemo />
          <BreadcrumbDemo />
          <CardDemo />
          <CollapsibleDemo />
          <DialogDemo />
        </div>
      </div>
    </div>
  )
}
