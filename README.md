# prefetch-context-webpack-plugin

Webpack plugin which prefetches context (all files within the directory tested
by a regular expression).

The usecase I had in mind is to use it in combination with `eslint-loader` to
lint not only the files which are in dep tree but every file in a source
directory.

Example configuration w/ `eslint-loader`:

```
import PrefetchContext from 'prefetch-context-webpack-plugin'

module.exports = {

  ...

  plugins: [
    new PrefetchContext({
      context: './src',
      loader: 'eslint-loader',
    })
  ]
}
```

Now every file within the `./src` directory will be linted.
