const {makeAreas, countAreas} = require('./day6')

const fs = require('fs')
const PNG = require('pngjs').PNG;

(async () => {
  const coords = [
    [242, 112],
    [292, 356],
    [66, 265],
    [73, 357],
    [357, 67],
    [44, 303],
    [262, 72],
    [220, 349],
    [331, 301],
    [338, 348],
    [189, 287],
    [285, 288],
    [324, 143],
    [169, 282],
    [114, 166],
    [111, 150],
    [251, 107],
    [176, 196],
    [254, 287],
    [146, 177],
    [149, 213],
    [342, 275],
    [158, 279],
    [327, 325],
    [201, 70],
    [145, 344],
    [227, 345],
    [168, 261],
    [108, 236],
    [306, 222],
    [174, 289],
    [67, 317],
    [316, 302],
    [248, 194],
    [67, 162],
    [232, 357],
    [300, 193],
    [229, 125],
    [326, 234],
    [252, 343],
    [51, 263],
    [348, 234],
    [136, 337],
    [146, 82],
    [334, 62],
    [255, 152],
    [326, 272],
    [114, 168],
    [292, 311],
    [202, 62]
  ]
  const areas = makeAreas(coords)
  const notInfiniteAreas = countAreas(coords)

  const newfile = new PNG({width: areas[0].length, height: areas.length})
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
          255,255,255
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
