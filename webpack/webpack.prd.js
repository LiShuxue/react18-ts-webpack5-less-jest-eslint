const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const config = {
  mode: 'production',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename], //使用文件缓存
    },
  },
  optimization: {
    minimize: true,
    moduleIds: 'deterministic',
    minimizer: [`...`, new CssMinimizerPlugin()], // For webpack@5 you can use the `...` syntax to extend existing minimizers
    runtimeChunk: {
      name: 'runtime', // 运行时抽出来
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: {
          // 项目公共组件
          minSize: 0, // 分离后的最小块文件大小默认3000
          name: 'common', // 用以控制分离后代码块的命名
          minChunks: 2, // 最小共用次数
          priority: 10, // 优先级，多个分组冲突时决定把代码放在哪块
          reuseExistingChunk: true,
        },

        vendors: {
          //拆分第三方库（通过npm|yarn安装的库）
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: 10,
        },
      },
    },
  },
};

const mergedConfig = webpackMerge.merge(baseConfig, config);
module.exports = mergedConfig;
