import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import { rspack } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginEslint } from '@rsbuild/plugin-eslint';

const execAsync = promisify(exec);



// Загружаем переменные окружения из .env файлов
const loadEnv = () => {
  const { NODE_ENV, PROJECT } = process.env;
  const dotenvFiles = [
    PROJECT !== undefined && `.env.${PROJECT}`,
    `.env.${NODE_ENV}.local`,
    NODE_ENV !== 'test' && `.env.local`,
    `.env.${NODE_ENV}`,
    '.env',
  ].filter(Boolean) as string[];

  dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
      require('dotenv-expand').expand(
        require('dotenv').config({
          path: dotenvFile,
        })
      );
    }
  });
};

// Получаем переменные окружения
const getGitInfo = async () => {
  let commitId = process.env.REACT_APP_COMMIT_ID;
  let branchDateTime = process.env.REACT_APP_BRANCH_DATE_TIME;

  if (!commitId || commitId === 'DEV') {
    try {
      const { stdout } = await execAsync('git log -n 1 --pretty="format:%h"');
      commitId = stdout.trim();
    } catch (err) {
      commitId = 'unknown';
    }
  }

  if (!branchDateTime || branchDateTime === "no-valid") {
    try {
      const { stdout } = await execAsync('git log -n 1 --pretty="format:%ai"');
      branchDateTime = stdout.trim();
    } catch (err) {
      branchDateTime = 'unknown';
    }
  }

  return { commitId, branchDateTime };
};

// Получаем переменные окружения для DefinePlugin
const getClientEnvironment = (publicUrl: string) => {
  const REACT_APP = /^REACT_APP_/i;
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || 'development',
        PUBLIC_URL: publicUrl,
        WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
        WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
        WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
        FAST_REFRESH: process.env.FAST_REFRESH || false,
      } as any
    );

  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {} as any),
  };

  return { raw, stringified };
};

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const publicUrlOrPath = process.env.PUBLIC_URL;


const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// config after eject: we're in ./config/
const paths = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  rootPath: resolveApp('../../..'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appClassesSrc: resolveApp('../essence-constructor-classes/src'),
  appShareSrc: resolveApp('../essence-constructor-share/src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  rootNodeModules: resolveApp('../../../node_modules'),
  appTsBuildInfoFile: resolveApp('node_modules/.cache/tsconfig.tsbuildinfo'),
  publicUrlOrPath,
};

export default defineConfig(async () => {
  // Загружаем переменные окружения
  loadEnv();

  const { commitId, branchDateTime } = await getGitInfo();
  const env = getClientEnvironment(process.env.PUBLIC_URL || '');


  let proxy = {
    "/api": { changeOrigin: true, target: "http://localhost:9020/" },
    "/api_module": { changeOrigin: true, target: "http://localhost:9020/" },
    "/notification": { changeOrigin: true, target: "http://localhost:9020/", ws: true },
  };

  try {
    if (process.env.PROXY) {
      for (let obj of JSON.parse(process.env.PROXY)) {
        proxy[obj.path] = obj.options;
      }
    }
  } catch (err) {
    console.warn("PROXY environment not set", err);
    proxy = {
      "/api": { changeOrigin: true, target: "http://localhost:9020/" },
      "/api_module": { changeOrigin: true, target: "http://localhost:9020/" },
      "/notification": { changeOrigin: true, target: "http://localhost:9020/", ws: true },
    };
  }
  console.log(proxy);

  const appPackageJson = require(paths.appPackageJson);

  return {
    plugins: [
      pluginEslint({
        eslintPluginOptions: {
          cwd: __dirname,
          configType: 'flat',
        }
      }),
      pluginBabel({
        babelLoaderOptions: {
          presets: [["@babel/preset-typescript", { isTSX: true, allExtensions: true }], ["@babel/preset-env", { loose: true }], "@babel/preset-react"],
          plugins: [['@babel/plugin-proposal-decorators', { version: "legacy" }], ["@babel/plugin-transform-class-properties", { loose: true }]],
        }
      }),
      pluginReact(),
      pluginModuleFederation({
        name: "essence_core",
        filename: "essence_core.js",
        shared: {
          "react": {
            requiredVersion: appPackageJson.dependencies["react"],
            eager: true
          },
          "react-dom": {
            requiredVersion: appPackageJson.dependencies["react-dom"],
            eager: true
          },
          "@essence-community/constructor-share": {
            singleton: true,
            requiredVersion: appPackageJson.dependencies["@essence-community/constructor-share"],
            eager: true
          },
          "mobx": {
            singleton: true,
            requiredVersion: appPackageJson.dependencies["mobx"],
            eager: true
          },
          "mobx-react": {
            singleton: true,
            requiredVersion: appPackageJson.dependencies["mobx-react"],
            eager: true
          }
        }
      })
    ],
    source: {
      entry: {
        index: './src/index'
      },
      include: [
        'src',
        '../essence-constructor-classes/src',
        '../essence-constructor-share/src'
      ],
      define: env.stringified,
    },
    resolve: {
      alias: {
        'react-native': 'react-native-web',
        '@essence-community/constructor-classes': path.resolve(__dirname, '../essence-constructor-classes'),
        '@essence-community/constructor-share': path.resolve(__dirname, '../essence-constructor-share/src'),
      }
    },
    output: {
      distPath: {
        root: 'build',
        js: 'static/js',
        css: 'static/css',
        media: 'static/media'
      },
      filename: {
        js: '[name].[contenthash:8].js',
        css: '[name].[contenthash:8].css',
        media: '[name].[hash][ext]'
      },
      publicPath: process.env.PUBLIC_URL || '/',
      clean: true
    },
    dev: {
      port: 3000,
      host: 'localhost',
      https: false,
      hot: true
    },
    html: {
      template: './public/index.html',
      templateParameters: {
        PUBLIC_URL: !process.env.PUBLIC_URL || process.env.PUBLIC_URL === "/" ? '' : process.env.PUBLIC_URL,
        REACT_APP_SETTINGS: env.raw.REACT_APP_SETTINGS,
        REACT_APP_COMMIT_ID: commitId,
        REACT_APP_BRANCH_DATE_TIME: branchDateTime
      }
    },
    tools: {
      bundlerChain: (chain, { CHAIN_ID }) => {
        // Настройка Monaco Editor
        chain.plugin('monaco-editor').use(require('monaco-editor-webpack-plugin'), [{
          publicPath: '/vs',
          filename: '[name].worker.js',
          languages: ['javascript', 'typescript', 'css', 'html', 'json']
        }]);

        // Настройка оптимизации для production
        if (process.env.NODE_ENV === 'production') {
          chain.optimization.splitChunks({
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 30000,
            maxSize: Infinity,
            minChunks: 1,
            automaticNameDelimiter: "-",
            cacheGroups: {
              monacoVendor: {
                test: /[\\/]node_modules[\\/]([\@]?monaco.*?)[\\/]/,
                name: "vendor-monaco-editor",
                enforce: true,
              },
              reactVendor: {
                test: /[\\/]node_modules[\\/](react.*?|rc-.+?)[\\/]/,
                name: "vendor-react",
                enforce: true,
              },
              utilityVendor: {
                test: /[\\/]node_modules[\\/](lodash.*|to-.+|micromark-.+|moment|moment-timezone)[\\/]/,
                name: "vendor-utility",
                enforce: true,
              },
              materialUiVendor: {
                test: /[\\/]node_modules[\\/]([\@]?material-.+)[\\/]/,
                name: "vendor-material-ui",
                enforce: true,
              },
              shareVendor: {
                test: /[\\/]\@essence-community[\\/]constructor-share[\\/]/,
                name: "share-essence",
                enforce: true,
              },
              vendor: {
                test: /[\\/]node_modules[\\/](?!(\@essence-community|mdi-react|[\@]?material-.+|lodash.*?|to-.+|micromark-.+|moment|moment-timezone|react.*?|rc-.+?|[\@]?monaco.*?)).*?([\\/]|$)/,
                priority: 1,
                name: "vendor",
                enforce: true,
              },
              default: {
                priority: -20,
                reuseExistingChunk: true,
              },
            },
          });
        }
      },
      // Настройки для TypeScript
      tsLoader: {
        transpileOnly: true
      },
      rspack: {
        plugins: [
          new rspack.DefinePlugin(env.stringified),
          new rspack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/
          }),
          new rspack.CopyRspackPlugin({
            patterns: [{
              from: path.join(__dirname, 'src/version.json'),
              to: path.join(__dirname, 'build/version.json'),
              transform(content) {
                const COMMIT_ID = commitId || "";
                const BRANCH_NAME = process.env.REACT_APP_BRANCH_NAME || "";
                const BRANCH_DATE_TIME = branchDateTime || "";
                return JSON.stringify({
                  version: BRANCH_NAME,
                  commit: COMMIT_ID,
                  date: BRANCH_DATE_TIME,
                }, null, 2);
              },
            }],
          }),
        ],
      },
    },
    performance: {
      chunkSplit: {
        strategy: 'split-by-module'
      }
    },
    server: {
      port: 3000,
      host: 'localhost',
      proxy,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      },
    }
  };
}); 