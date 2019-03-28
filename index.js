var Markdown = require('marli')
var md = Markdown()

module.exports = function (read, write) {
  return new Promise((res, rej) => {
    var str = ''
    read.on('data', (chunk) => {
      str += chunk
    })
    read.on('end', () => setTimeout(() => { res(str) }, 250/* why?? */))
    read.on('error', rej)
  }).then((input) => {
    var dom = md([input])
    var start = dom.indexOf('<h1>')
    var end = dom.indexOf('</h1>')

    write.write("<html>\n<head>\n")
    if (start >= 0 && end > start) {
      var title = dom.substr(start + 4, end - 4)
      write.write("<title>" + title + "</title>\n")
    }
    write.write("</head>\n<body>\n")
    write.write(dom.toString())
    write.write("</body>\n</html>")
  })
}
