# URL Shortener 短網址產生器
## 介紹
- 將過長的網址縮成較短網址的「短網址產生器」

## 動機
- 將網址縮短後，就不用再看又長又臭的網址了

## 功能
- 輸入網址轉換成短網址
- 點擊Copy按鈕複製網址或直接點選網址
- 在伺服器運作的情況下，透過短網址可回到到原本網址

## 啟動專案
將專案複製到本地:
```
$ git clone https://github.com/code689/Short_URL.git
```
進入專案資料夾:
```
$ cd Short_URL
```
安裝npm:
```
$ npm install express
$ npm install express-handlebars
```
啟動專案:
```
$ npm run dev
```

成功時，終端機會顯示以下訊息，請打開瀏覽器進入網址(http://localhost:3000):
```
express server is running on http://localhost:3000
```

欲結束使用:
```
ctrl + c
```

## 開發工具

* Visual Studio Code v1.85.2
* git version 2.43.0.windows.1
* npm 9.5.0
* node v18.14.2
* nodemon v3.0.3
* express 4.19.1
* express-handlebars 7.1.2
