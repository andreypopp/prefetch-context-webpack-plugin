/**
 * @copyright 2016-present, Andrey Popp <8mayday@gmail.com>
 */

import ContextDependency from 'webpack/lib/dependencies/ContextDependency';

export default class PrefetchAllPlugin {

  constructor(config) {
    this.config = config;
  }

  apply(compiler) {
    let lastHash = null;
    let context = this.config.context ?
      this.config.context :
      compiler.context;

    compiler.plugin('compilation', (compilation, params) => {
      compilation.dependencyFactories.set(
        ContextDependency,
        params.contextModuleFactory
      );
    });

    compiler.plugin('make', (compilation, cb) => {
      let request = this.config.loader ?
        `!!${this.config.loader}!${context}` :
        `!!${context}`;
      let test = this.config.test ?
        this.config.test :
        /\.js$/;
      let dep = new ContextDependency(request, true, test);
      compilation.prefetch(context, dep, err => {
        if (err) {
          cb(err);
        } else {
          cb(null);
        }
      });
    });

    compiler.plugin('done', (stats) => {
      // We do this because webpack by default suppresses output if compilation
      // output wasn't changed.
      if (stats.hash === lastHash) {
        process.stdout.write(stats.toString({}) + '\n');
      }
      lastHash = stats.hash;
    });
  }
}
