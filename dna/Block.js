'use strict'

const Block = function(dat) {
    this.x = 0
    this.y = 0
    this.w = 40
    this.h = 40

    this.c = 65 + lib.math.rndi(26)

    this.color = '#a56901'
    this.textColor = '#d8b61c'

    sys.augment(this, dat)
}

Block.prototype.onDblClick = function() {
    // change letter
    if (this.c === 0) this.c = 65
    else if (this.c > 90) this.c = 0
    else this.c ++

    log.out('ch: ' + this.c + ' = ' + String.fromCharCode(this.c))
}

Block.prototype.draw = function() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.w, this.h)

    ctx.fillStyle = this.textColor
    ctx.font = env.hud.font
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillText(String.fromCharCode(this.c), this.x + this.w/2, this.y + this.h/2)
}

module.exports = Block

