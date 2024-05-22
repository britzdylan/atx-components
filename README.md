# atx-components

![Version](https://img.shields.io/npm/v/atx-components.svg)
![Downloads](https://img.shields.io/npm/dt/atx-components.svg)

atx-components is a powerful and efficient command-line tool designed specifically for AdonisJs. It allows developers to effortlessly copy pre-built UI component files (stubs) into their project directories. This tool is instrumental in rapidly setting up and integrating standard UI components into your AdonisJs applications.

The components are based on JSX and require the following packages to be pre-installed and fully configured in your project:

- "@adonisjs/vite": "^2.0.2"
- "@alpinejs/anchor": "^3.13.8"
- "@alpinejs/collapse": "^3.13.8"
- "@alpinejs/focus": "^3.13.8"
- "adonisjsx": "^0.2.0"
- "alpinejs": "^3.13.7"
- "class-variance-authority": "^0.7.0"
- "clsx": "^2.1.0"
- "tailwind-merge": "^2.2.2"

## Installation

You can globally install `atx-components` or use it directly with `npx`.

### Global Installation

```bash
npm install -g atx-components
```

After installing globally, you can use the atx-components command from anywhere in your terminal.

Using npx

```bash
npx atx-components add --args [components]
```

## Usage

**Adding Components**
The primary command of this tool is `add`, which copies components into your project:

```bash
atx-components add
```

**Options**:
`--args, -a` (optional): Specify a list of components you want to add. If omitted, all available components will be added.

```bash
atx-components add --args button card dropdown
```

List of Available Components

- accordion,
- avatar,
- alert,
- alert-dialog,
- badge,
- breadcrumbs,
- button,
- card,
- checkbox,
- collapsible,
- dialog,
- drawer,
- dropdown,
- hover-card,
- icon,
- input,
- label,
- menubar,
- navigation-menu,
- pagination,
- popover,
- progress,
- radio-group,
- select,
- sheet,
- switch,
- table,
- tabs,
- text-area

### File Structure

By default, the atx-components add command copies the pre-built files to the following destination paths in your project:

**Components**:

- `UI/components/primitives/[component_name].tsx`

**Index**:

- `UI/components/index.ts`

**Layout**:

- `UI/layouts/default.tsx`

**Types**:

- `UI/lib/types.ts`

**Utilities**:

- `UI/lib/utils.ts`

**Home Page**:

- `UI/pages/home.tsx`

**Contributing**

If you have any suggestions or find a bug, feel free to create an issue or submit a pull request on our GitHub repository.

**License**

This project is licensed under the MIT License
