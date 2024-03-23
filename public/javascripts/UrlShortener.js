document.querySelector("#urlBtn").addEventListener("click", (event) => {
  event.preventDefault()
  const url = UrlShorten();
  url ? sendUrl(url) : alert("網址格式錯誤")
})

function UrlShorten() {
  const urlInput = document.querySelector("#urlInput");
  const url = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/[\w./-]*)*(\?[^\s?]*=[^\s?]*(&[^\s?]*=[^\s?]*)*)?$/i.test(urlInput.value)

  if (url) return urlInput.value
}

function sendUrl(url) {

  fetch("/buildUrlShortener", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ urlInput: url })
  })
    .then(response => response.text())
    .then(data => {
      if (data) buildHtml(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function buildHtml(params) {
  // http://localhost:3000/${params}
  const UrlShortener = document.querySelector(".UrlShortener");
  UrlShortener.innerHTML = `
    <h3>Success! Please use this link:</h3>
    <a href='http://localhost:3000/${params}' target="_blank" id="generatedURL">http://localhost:3000/${params}</a>
    <div>
    <button id="copy" onclick="CopyFun()">Copy</button>
    </div>
    <div>
    <a href="http://localhost:3000/">HOME</a>
    </div>
  `
}

function CopyFun() {
  const URL = document.querySelector("#generatedURL")
  navigator.clipboard.writeText(URL.innerText)
    .then(() => alert('已複製網址內容'))
    .catch(error => console.log(error))
}

