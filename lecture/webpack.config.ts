import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack, { HotModuleReplacementPlugin } from 'webpack';

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: webpack.Configuration = {
  name: 'sleact',
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'inline-source-map' : 'hidden-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // alias = 별명, tsconfig.json과 별개로 해줘야 함.
      '@hooks': path.resolve(__dirname, 'hooks'),
      '@components': path.resolve(__dirname, 'components'),
      '@layouts': path.resolve(__dirname, 'layouts'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@typings': path.resolve(__dirname, 'typings'),
    },
  },
  entry: {
    app: './client',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader', // js아닌애를 js로 만들어주는 역할
        options: {
          presets: [
            [
              '@babel/preset-env', // 구 브라우저 지원
              {
                targets: { browsers: ['last 2 chrome versions'] },
                debug: isDevelopment,
              },
            ],
            '@babel/preset-react', // jsx -> js
            '@babel/preset-typescript', // ts -> js
          ],
          env: {
            development: {
              plugins: [['emotion', { sourceMap: true }], require.resolve('react-refresh/babel')],
            }, // 개발 할때는 컴포넌트 이름을 보고 편하게 개발할 수 있게 해줌.
            production: {
              plugins: ['emotion'], // 컴포넌트 이름 제거
            },
          },
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin(), new HotModuleReplacementPlugin()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
  },
  devServer: {
    historyApiFallback: true,
    port: 3090,
    publicPath: '/dist/',
  },
};

export default config;
