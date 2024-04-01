import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

type Props = {
  styleTags: React.ReactElement;
};

export default class MyDocument extends Document<Props> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { styleTags } = this.props;
    return (
      <Html lang="fr">
        <Head>
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
      </Html>
    );
  }
}
