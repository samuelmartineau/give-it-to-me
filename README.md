# Give It To Me

## Description

Give-it-to-me is an app which simplifies my father's life on managing his cellar.

## Teachers

[Full-Stack Redux Tutorial](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)

[react-redux-socketio-chat](https://github.com/raineroviir/react-redux-socketio-chat)

[Gaearon](https://github.com/gaearon)

[Kombucha](https://github.com/kombucha)

### Dependencies

First install either [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/script/index.php).


### Development

```
npm run dev
```

#### Deploy

Run:

```
npm run deploy -- [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease| from-git]
```

### Production

#### Codeship

##### Build


```
nvm install 5
npm install
npm run build-codeship
```

##### Deploy

```
mkdir deploy
mv package.json deploy/
mv .babelrc deploy/
mv device-infos deploy/
mv config deploy/
mv src deploy/
mv dist deploy/
mv src bin/
cd deploy
git init
git config --global user.email "martineau.samuel.1990+codeship@gmail.com"
git config --global user.name "Samuel Martineau(codeship)"
git remote add origin git@github.com:samuelmartineau/give-it-to-me.git
git add .
git commit -m "codeship deploy"
git push -f origin master
```

#### Heroku

todo

#### Home

private stuff

## Todos
* display devices already connected on welcomePage (useragent)
* handle empty result
