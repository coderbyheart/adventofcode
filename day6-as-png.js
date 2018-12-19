const { makeAreas, countAreas } = require('./day6')

const fs = require('fs')
const PNG = require('pngjs').PNG
const input = require('./day6.json');

(async () => {
  const areas = makeAreas(input)
  const notInfiniteAreas = countAreas(input)

  const newfile = new PNG({ width: areas[0].length, height: areas.length })
  const colors = {}

  for (let y = 0; y < newfile.height; y++) {
    for (let x = 0; x < newfile.width; x++) {
      const idx = (newfile.width * y + x) << 2

      const area = areas[y][x]
      if (!colors[area]) {
        colors[area] = notInfiniteAreas[area] ? [
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 255)
        ] : [
          255, 255, 255
        ]
      }

      newfile.data[idx] = colors[area][0]
      newfile.data[idx + 1] = colors[area][1]
      newfile.data[idx + 2] = colors[area][2]
      newfile.data[idx + 3] = 0xff
    }
  }

  newfile.pack()
    .pipe(fs.createWriteStream(__dirname + '/day6.png'))
    .on('finish', () => {
      console.log('Written!')
    })
})()
