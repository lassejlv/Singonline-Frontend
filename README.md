## Vite Project

> [!WARNING]
> This template only works with the [Bun Rumtime](https://bun.sh) installed on your system.

A fully setup vite template, includes typescript support, tailwind out-of-the-box. Have components in seprate html files, and more!

It also comes with setup `prettier-tailwind-plugin` for better sorting of tailwind classes.

It automatically setup a `multi-page` project, so you don't have to worry about setting up multiple pages. You can create a new page by running `bun new <page-name>`. This will create a new page in `src/<page_name>` with all the necessary files.

## Seprate Components

This template uses a plugin called `vite-include-html-plugin` wich will scan all your html files for a `<include src="path/to/file.html"></include>` tag and replace it with the content of the file. This way you can have seprate components in seprate files. Make sure you have ending tags for the include tag, otherwise it will not work.

## Usage
```
bun install
````

```bash
bun dev
```

And you are good to go! 🚀
