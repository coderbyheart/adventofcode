'use strict'

module.exports = {
    calibrate: changes => changes.reduce((frequencies, frequency) => frequencies + frequency, 0)
}