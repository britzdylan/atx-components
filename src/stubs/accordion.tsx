import { PropsWithChildren } from 'adonisjsx';
import { cn } from '#fragments/lib/utils';
import { JsxElementProps, IconNames } from '#fragments/lib/types';

interface AccordionContentProps extends JsxElementProps {
  self?: boolean;
}
/**
 * @component AccordionContent (Required)
 * @param {boolean} props.self - Controls the behavior of the accordion, If true then the accordion handles its own state, if false then the parent component handles the state.
 * @param {children} props.children - The content to show and hide.
 * @returns {JSX.Element} The rendered component.
 *
 * @description This is the content element for the AccordionItem component, and is responsible for showing or hiding the accordion content.
 * @example <AccordionContent><p>Home content</p></AccordionContent>
 */
function AccordionContent({
  children,
  ...props
}: PropsWithChildren<AccordionContentProps>): JSX.Element {
  const { self = false, class: className } = props;

  const sharedProps = {
    class: cn('overflow-hidden text-sm transition-all', className),
    role: 'region',
    'x-bind:id': "$id('accordion')",
    'x-collapse': true,
    'x-cloak': true,
    'x-bind:aria-labelledby': "'accordion-header-' + $id('accordion')",
  };

  // IF the self prop is set to false, the accordion is controlled by the parent component.
  if (!self) {
    return (
      <div
        {...sharedProps}
        attrs={{
          'x-show': "activeAccordion==$id('accordion')",
          'x-bind:aria-hidden': "activeAccordion==$id('accordion')",
        }}>
        {children}
      </div>
    );
  }

  return (
    <div
      {...sharedProps}
      attrs={{
        'x-show': 'isOpen',
        'x-bind:aria-hidden': '!isOpen',
      }}>
      {children}
    </div>
  );
}

interface AccordionTriggerProps extends JsxElementProps {
  icon?: IconNames;
  self?: boolean;
}

/**
 * @component AccordionTrigger (Required)
 * @param {boolean} props.self - Controls the behavior of the accordion, If true then the accordion handles its own state, if false then the parent component handles the state.
 * @param {IconNames} props.icon - The name of the icon. Default is 'nav-arrow-down'.
 * @param {children} props.children - The content of the trigger.
 * @returns {JSX.Element} The rendered component.
 *
 * @description This is the header element for the AccordionItem component, and is responsible for toggling the accordion content.
 * @example    <AccordionTrigger icon="home">Home</AccordionTrigger>
 */
function AccordionTrigger({
  children,
  ...props
}: PropsWithChildren<AccordionTriggerProps>): JSX.Element {
  const { self = false, icon = 'nav-arrow-down', class: className } = props;

  const classes = cn(
    'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline w-full',
    className
  );

  const sharedButtonProps = {
    class: classes,
    type: 'button',
    'x-bind:id': "'accordion-header-' + $id('accordion')",
  };

  const sharedIconProps = {
    class:
      'h-4 w-4 shrink-0 transition-transform duration-200 data-[show=true]:rotate-180',
    'aria-hidden': true,
  };

  function Icon() {
    return (
      <i
        class={[
          cn('before:w-4 before:h-4'),
          className,
          `iconoir-${icon} `,
        ]}></i>
    ); //call a custom Icon here to avoid dependency
  }

  // If the self prop is set to false, the accordion is controlled by the parent component.
  if (!self) {
    return (
      <button
        {...sharedButtonProps}
        attrs={{
          'x-bind:aria-expanded': "activeAccordion==$id('accordion')",
          'x-bind:aria-controls': "$id('accordion')",
          'x-on:click': "setActiveAccordion($id('accordion'))",
        }}>
        {children}

        <span
          {...sharedIconProps}
          attrs={{
            'x-bind:data-show': "activeAccordion==$id('accordion')",
          }}>
          <Icon />
        </span>
      </button>
    );
  }

  return (
    <button
      {...sharedButtonProps}
      attrs={{
        'x-bind:aria-expanded': 'isOpen',
        'x-on:click': 'toggleAccordion()',
        'x-bind:aria-controls': "$id('accordion')",
      }}>
      {children}

      <span
        {...sharedIconProps}
        attrs={{
          'x-bind:data-show': 'isOpen',
        }}>
        <Icon />
      </span>
    </button>
  );
}

interface AccordionItemProps extends JsxElementProps {
  self?: boolean;
  active?: boolean;
}

/**
 * @component AccordionItem (Required)
 * @param {boolean} props.self - Controls the behavior of the accordion, If true then the accordion handles its own state, if false then the parent component handles the state.
 * @param {boolean} props.active - If true then the accordion is open by default.
 * @requires AccordionTrigger || AccordionContent
 * @returns {JSX.Element} The rendered component.
 *
 * @description This is the main control element for the Accordion and the direct child of the Accordion component.
 * @example   <AccordionItem self active>...</AccordionItem>
 */
function AccordionItem({
  children,
  ...props
}: PropsWithChildren<AccordionItemProps>): JSX.Element {
  const { self = false, active = false, class: className } = props;

  const sharedProps = {
    class: cn('border-b', className),
    'x-id': "['accordion']",
  };

  if (self) {
    const dataObj = `{
      isOpen: ${active},
      toggleAccordion() {
        this.isOpen = !this.isOpen
      },
    }`;
    return (
      <div {...sharedProps} x-data={dataObj}>
        {children}
      </div>
    );
  }

  return <div {...sharedProps}>{children}</div>;
}

interface AccordionRootProps extends JsxElementProps {
  type: 'single' | 'multiple';
  activeAccordion?: string;
}

/**
 * @component Accordion (Required)
 * @param {'single' | 'multiple'} props.type - Controls the behavior of the accordion.
 * @param {string} props.activeAccordion - The id of the active accordion. See AccordionItem.
 * @requires AccordionItem[]
 * @returns {JSX.Element} The rendered accordion component.
 *
 * @description This is the main root element for the Accordion.
 * @example  <Accordion type="single" activeAccordion="accordion-1">...</Accordion>
 */
function Accordion({
  children,
  ...props
}: PropsWithChildren<AccordionRootProps>): JSX.Element {
  const { type = 'single', activeAccordion = '', class: className } = props;

  if (type !== 'single' && type !== 'multiple') {
    throw new Error('Prop: "type" must be either "single" or "multiple"');
  }

  const sharedProps = {
    class: cn('w-full', className),
  };

  if (type === 'multiple') {
    return <div {...sharedProps}>{children}</div>;
  }

  const dataObj = `{
      activeAccordion: '${activeAccordion}',
      setActiveAccordion(id) {
        this.activeAccordion = this.activeAccordion == id ? '' : id
      },
    }`;

  return (
    <div x-data={dataObj} {...sharedProps}>
      {children}
    </div>
  );
}

function AccordionDemo() {
  return (
    <Accordion type='single' activeAccordion='accordion-1'>
      <AccordionItem active>
        <AccordionTrigger icon='nav-arrow-down'>Home</AccordionTrigger>
        <AccordionContent>
          <p>Home content</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger icon='nav-arrow-down'>Settings</AccordionTrigger>
        <AccordionContent>
          <p>Settings content</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function AccordionSelfDemo() {
  return (
    <Accordion type='multiple'>
      <AccordionItem self active>
        <AccordionTrigger self icon='nav-arrow-down'>
          Home
        </AccordionTrigger>
        <AccordionContent self>
          <p>Home content</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem self>
        <AccordionTrigger self icon='nav-arrow-down'>
          Settings
        </AccordionTrigger>
        <AccordionContent self>
          <p>Settings content</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionDemo,
  AccordionSelfDemo,
};
