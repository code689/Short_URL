const express = require('express')
const { engine } = require('express-handlebars')
const fs = require('fs');
const app = express()
const port = 3000

const FilePath = "./public/json/UrlShortener.json"

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) //// 解析 POST 請求的表單數據
app.use(express.json()); // 解析 JSON 格式的請求主體

let urlData = {};
//如果指定的文件或目錄存在，則 fs.existsSync() 返回 true，否則返false
if (fs.existsSync(FilePath)) {
  const data = fs.readFileSync(FilePath, 'utf-8')
  urlData = JSON.parse(data)
} else {
  console.log("找不到")
}

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/buildUrlShortener', (req, res) => {
  const originalURL = req.body.urlInput
  let shortURL = urlData[originalURL]

  if (!shortURL) {
    const result = datadd()
    urlData[originalURL] = result
    fs.writeFileSync(FilePath, JSON.stringify(urlData), 'utf-8')
    res.send(result)
  } else {
    res.send(shortURL)
  }

})

app.get("/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL
  let originalURL
  for (const key in urlData) {
    urlData[key] === shortURL ? originalURL = key : ""
  }

  if (originalURL) res.redirect(originalURL)
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})

function datadd() {
  // 字元表，由 0-9、a-z、A-Z 組成
  const BASE_62_CHAR = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  // 字元表的最大 Index
  const MAX = 61
  // 字元表的最小 Index
  const MIN = 0
  // 生成字數
  const count = 5

  let result = ""
  for (let i = 0; i < 5; i++) {
    /** 產生亂數 Index */
    const randomIndex = Math.floor(Math.random() * (MAX - MIN + 1) + MIN)
    /** 依照亂數表找出對應的字元 */
    const chooseChar = BASE_62_CHAR[randomIndex]
    /** 將對應字元放入 result */
    result += chooseChar
  }
  return result
}