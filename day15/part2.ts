import { loader } from '../lib/loader.js'
import { lowestRisk } from './navigateCave.js'
import { toMap } from './toMap.js'
import { wrap } from './wrap.js'

const input = toMap(loader(15)('input'))
console.log(lowestRisk(wrap(input))) // 3045
