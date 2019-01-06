import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width" />
          <meta name="theme-color" content="#5e0231" />
          <link rel="icon" href={'assets/favicon.png'} type="image/png" />
          <link
            rel="manifest"
            href={'assets/manifest.json'}
            crossOrigin="use-credentials"
          />
          {this.props.styleTags}
          <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
