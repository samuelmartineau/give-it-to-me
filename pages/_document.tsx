import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

type Props = {
  styleTags: React.ReactElement;
};

export default class MyDocument extends Document<Props> {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    const { styleTags } = this.props;
    return (
      <html lang="fr">
        <Head>
          <meta name="viewport" content="width=device-width" />
          <meta name="Description" content="Personal Cellar Manager." />
          <meta name="theme-color" content="#5e0231" />
          <link rel="icon" href={'assets/favicon.png'} type="image/png" />
          <link
            rel="manifest"
            href={'assets/manifest.json'}
            crossOrigin="use-credentials"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Ranga&display=swap"
            rel="stylesheet"
          ></link>
          {styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
