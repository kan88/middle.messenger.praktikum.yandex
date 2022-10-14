const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 3000

//html
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'yandex-middle.html'))
})

app.get('/chats.html', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'chats.html'))
})

app.get('/reg.html', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'reg.html'))
})

app.get('/set.html', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'set.html'))
})


//styles

app.get('/yandex-middle.css', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'yandex-middle.css'))
})

app.get('/yandex-middle.css.map', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'yandex-middle.css.map'))
})


//fonts

app.get('/opensans.woff2', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'opensans.woff2'))
})

app.get('/opensans.woff', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'opensans.woff'))
})

app.get('/opensansbold.woff', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'opensansbold.woff'))
})

app.get('/opensansbold.woff2', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'opensansbold.woff2'))
})

app.listen(PORT)