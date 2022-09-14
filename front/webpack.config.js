const path = require('path')
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  //モードをdevelopment、production、noneから設定（必須）
  //development: 開発時のファイル出力モード（最適化より時間短縮、エラー表示を優先）
  //production: 本番時のファイル出力モード（最適化されて出力）
  mode: 'development',
  //メインとなるjsファイル(エントリーポイント)
  entry: {
    index: './src/index.tsx',
    latestInformation: './src/latestInformation.tsx'
  },
  //ファイルの出力設定
  output: {
    path: path.join(__dirname, '/dist'), //出力先のディレクトリ（絶対パスで指定）
    filename: "[name].bundle.js", //出力ファイル名
  },
  //デバッグのためのSourceMap（ビルド前後の対応関係を記述したファイル）の出力設定
  devtool: 'inline-source-map',
  //対象のファイルを変換するためのloaderを設定
  module: {
    rules: [
      {
        test: /\.tsx?$/, //build対象（loaderを適用するファイル）を指定
        loader: 'ts-loader', //適用するloaderを指定
      },
      {
        test: /\.gif/,
        type: 'asset/resource'
      }
    ]
  },
  //importの際に省略する対象の拡張子を配列で指定
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'] //指定されている拡張子のファイルはimportの際に拡張子を省略できる
  },
  //webpack-dev-serverの設定
  devServer: {
    static: path.join(__dirname, '/dist'), //表示する静的ファイル（HTML）の場所を指定
    open: true, //ブラウザを自動的に起動
    port: 3000, //ポート番号を指定（デフォルトのポート：8080）
    historyApiFallback: true,
  },
  //pluginの設定
  plugins: [
    // public以下をdictに丸々コピーして、scriptタグは手動で付けることで、第一階層でのルーティングを実現させる
    new CopyWebpackPlugin({ patterns: [{ from: "public", to: "." }] }),
    new WriteFilePlugin(),
    new webpack.DefinePlugin({
      'process.env.host': "http://localhost:8000/"
    }),
  ]
}
