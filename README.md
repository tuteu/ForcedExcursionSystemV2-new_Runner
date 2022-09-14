# 実習課題：強行遠足支援システムの改修

## 強行遠足支援システムの概要

毎年行われるH高校の強行遠足は、最長72kmを約１2時間で走破するイベントである。
最大7つ関門が設置されており、生徒は時間内にその関門を通過しなければならない。
本システムは、生徒にICカード持たせ、関門通過時にICカードリーダーにかざすことで、誰が何時にどの関門を通過するか記録するものである。
また、記録されたデータは、PCのWebブラウザやスマートフォンで閲覧することができる。
閲覧できる画面には、通過時間と順位をクラス単位や徒個人単位で表示できる画面や、教員の管理用に、どの関門で何人通過済みで、未通過が誰なのかを表示する画面など６種類程度の画面がある。

## 実習の内容

現行の強行遠足支援システムは、pythonとdjangoで実装されている。
ただし、djangoのテンプレートシステムはあまり使用しておらず、閲覧用の画面についてはHTML＋CSS＋JQueryで、djangoのサーバーからREST APIを呼び出すことで実装されている。

今回、テンプレートシステムを多用しないため、djangoよりより軽量なフレームワークであるFlaskに、本システムを移植したい。

### 開発の要件

* 強行遠足支援システムで用意しているAPIいくつかをFlaskで実装してほしい。
* アルゴリズムや機能の変更は必要ない。コピペでの移植もある程度は可能と思われるが、以下の点に留意すること
  * フレームワークが変更になるため、できるだけFlaskの流儀に則る形で実装すること
  * できるだけリーダブルで高速なコードにすること
    * [参考](<https://tech.uzabase.com/entry/2021/04/09/143842>)
* DBMSはとりあえずSQLiteで構わないが、MySQL、AWS Aurora等に移行が容易だとより望ましい。
* 期間的に全てのAPIの移植は難しいと思うので、簡単そうな方からいくつか選んで実施する

### 開発スキル、進め方など

* python3.8.2 + Flask2.1.2で開発する
* 動作検証用に[旧システム](<https://github.com/dnaka/ForciblyExcursion/tree/develop>)が動作できると良い。旧システムの開発環境の作成法は、[Readme.md](<https://github.com/dnaka/ForciblyExcursion/blob/develop/README.md>)を参照
  * develop ブランチが最新のコードである
  * develop ブランチのdocumentフォルダに[API仕様書](https://github.com/dnaka/ForciblyExcursion/blob/develop/document/api.md)と[画面仕様書](https://github.com/dnaka/ForciblyExcursion/blob/develop/document/view_design.md)がある。
  * develop ブランチのgateChecker.sqlite3ファイルには最低限のテストデータがinsertされている。必要なモジュールをpipでinstall後、`python manage.py runserver` コマンドでサーバーを起動することができる。
* 開発はアジャイル型の開発プロセス(Scrum)で行う。
* 実装順についてはtrelloの[カンバン](https://trello.com/b/u4zfEI53/internship2022)で管理する。アカウント登録用にメールアドレスが必要。
* trelloのチケット単位でソースコードをコミットし、Pull Requestを作成すること
  * Pull Requestでレビューを実施後にmergeすること。このため、作業時は別ブランチを作成してからコードの変更を行い、別ブランチをpush後にmasterブランチへのPullRequestを発行すること。
  * つまり git-flow に従って開発すること
* 旧システムのソースコードはgithub上にあるため、githubのアカウントとgitの知識は必須。
* IDEはVisualStudioCodeを用いる。

## APIの環境構築メモ

```sh
# 要Python3.6以降
# Install後、/Library/Frameworks/Python.framework/Versions/3.8/bin にパスを通すとflaskコマンドが使えるようになる
pip install Flask
```

### Flaskの参考資料

https://msiz07-flask-docs-ja.readthedocs.io/ja/latest/index.html

## frontの環境構築メモ

[これ](https://qiita.com/itachi/items/042865106d5422ab2028)を参考にした。

```sh
mkdir front
cd front
npm init -y
npm i -D typescript
npm i -D webpack webpack-cli webpack-dev-server
npm i -D ts-loader
npm i react react-dom
npm i -D @types/react @types/react-dom
npm i styled-components
npm i @types/styled-components --save-dev
npm i write-file-webpack-plugin --save-dev 
npm i copy-webpack-plugin --save-dev
npm i react-router-dom 
npm i http-proxy-middleware --save
tsc --init
```

## Tips

### 画像のimportでTS2307: Cannot find module 'XXX' or its corresponding type declarations

XXX.d.tsファイルを、プロジェクト配下に作成後、以下を定義する。

declare module '*.png'

