# Omnis Vue

A demonstration of how to integrate a Vue application into Omnis Studio with a consistent interface

## Installation

Download `omnis-vue.tar.gz` from Releases

### HTML Control (oBrowser)

Move `omnis-vue` directory into Omnis Studio `htmlcontrols`, in the application package
([Docs](https://www.omnis.net/blog/add-web-functionality-to-omnis-studio-desktop-apps-with-obrowser/))

### JSON Control (Remote Form)

See [Docs](https://omnis.net/developers/resources/onlinedocs/index.jsp?detail=WebDev/04jsoncomps.html#json-control-editor)

Aside: `$OMNIS_HOME` is the user directory where Omnis stores it's local files. It is a copy of the content in
`firstruninstall` after the first run of Omnis.

Move:

- `ctrl_omnis_vue/omnis_vue` -> `$OMNIS_HOME/html/controls`
- `ctrl_omnis_vue/ctrl_omnis_vue.css` -> `$OMNIS_HOME/html/css/ctrl_omnis_vue.css`
- `ctrl_omnis_vue/ctrl_omnis_vue.js` -> `$OMNIS_HOME/html/scripts/ctrl_omnis_vue.js`

Move _Optionally_:

(The `.map` file enables nicer debugger, because the full source is available in the browser's Inspect panel)

- `ctrl_omnis_vue/ctrl_omnis_vue.js.map` -> `$OMNIS_HOME/html/scripts/ctrl_omnis_vue.js.map`

Edit `$OMNIS_HOME/html/jsctempl.htm` to add:

```html
<!-- Omnis Vue Styles -->
<link type="text/css" href="css/ctrl_omnis_vue.css" rel="stylesheet" />
```

and

```html
<!-- Omnis Vue JavaScript -->
<script type="text/javascript" crossorigin src="scripts/ctrl_omnis_vue.js"></script>
```

to the CSS and JS sections, respectively.

## Development

### Build HTML / CSS / Assets

```bash
pnpm run build
```

### dist

All output is placed into the `dist` folder:

- `omnis-vue` as the oBrowser HTML Control
- `ctrl_omnis_vue` as the Remote Form JSON Control

### Omnis Interaction

All interaction with Omnis is contained in the `index.html` entry point and the `stores/omnis.ts` store.

### CORS Issues

Omnis Studio relies on [Chromium Embedded](https://bitbucket.org/chromiumembedded/cef/), which
respects normal file loading rules for disk content. This means that all code must be `base64`
encoded in order to avoid the CORS same-origin rules. The other solution is to manually configure
Chromium with switches like `--allow-file-access-from-files`, but that is both inconvenient and
insecure (switch is global, so it would affect regular HTTP loads in Omnis Studio as well)

To address this issue two plugins are used in the build:
[vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile) (inline of
JS/CSS) and [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html) for minification.
