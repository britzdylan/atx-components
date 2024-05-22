# My-CLI-Tool

![Version](https://img.shields.io/npm/v/my-cli-tool.svg)
![Downloads](https://img.shields.io/npm/dt/my-cli-tool.svg)

`My-CLI-Tool` is a convenient command-line tool that copies pre-built UI component files (stubs) to your project directory. This tool helps you quickly set up and integrate standard UI components into your project.

## Installation

You can globally install `My-CLI-Tool` or use it directly with `npx`.

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
my-cli-tool add --args button card dropdown
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
