import { Html, PropsWithChildren } from 'adonisjsx';
import { viteAssets, viteReactRefresh } from 'adonisjsx';

export function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <html id='page' lang='en'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        {viteReactRefresh()}
        {viteAssets(['resources/js/app.js'])}
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css'
        />

        <title>AdonisJS</title>
      </head>
      <body class='bg-background flex flex-col min-h-screen font-sans text-foreground'>``
        {children}
      </body>
    </html>
  );
}
