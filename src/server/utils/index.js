import {version} from '../../../package.json'

export function renderFullPage (html, initialState, bundleFilename) {
  return `
        <!doctype html>
        <html lang="fr">
          <head>
            <link rel="icon" href="./favicon.ico" type="image/x-icon" />
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
            <title>Give It To Me</title>
            <style>@keyframes blinker{50% {opacity: 0.5;}}.blinker{animation: blinker 2s linear infinite};a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{margin:0;padding:0;font-family:Roboto,sans-serif;cursor:default;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-webkit-touch-callout:none;line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}a img{border:none}</style>
          </head>
          <body>
            <container id="react"><div>${html}</div></container>
            <script>
              window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
              window.__CURRENT_VERSION__ = '${version}';
            </script>
            <script src="/vendor.js"></script>
            <script async src="/main.js"></script>
          </body>
        </html>
        `
}

export function skip (path, middleware) {
  return (req, res, next) => {
    if (req.path.indexOf(path) !== -1) {
      return next()
    }
    return middleware(req, res, next)
  }
}

export function fakeWindow () {
  return (req, res, next) => {
    if (typeof window === 'undefined') {
      global.window = {
        __CURRENT_VERSION__: version,
        innerWidth: req.headers.WS_WIDTH, // comes from device-infos middleware
        addEventListener: () => {}
      }
    }
    next()
  }
}

export function filterSoftDeleted (item) {
  return item.hasFields('_deleted').not()
    .or(item('_deleted').not())
}
