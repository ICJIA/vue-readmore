# vue-readmore-readless

> Simple read-more / read-less reveal for Vue 2.x

## Installation

```bash
$ npm install vue-readmore-readless
```

**Install Google Material Design fonts in `/public/index.html`**

```
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons"/>
```

**Install `vue-readmore-readless` in `/src/main.js`:**

```
import Readmore from "vue-readmore-readless";
Vue.use(Readmore);
```

## Usage examples:

```
<readmore
      :content="content"
      :height="150"
      readMore="Read More"
      readLess="Less"
    ></readmore>
```

```
    <readmore
      :content="content"
      :height="150"
      readMoreText="Go Deeper"
      readMoreIcon="play_arrow"
      showWordCount
    ></readmore>
```

## Options:

More here...

## Demo

https://readmore-readless.netlify.com/
