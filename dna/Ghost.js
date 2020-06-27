'use strict'

const defaults = {
    x: ctx.width/2,
    y: ctx.height/2,
    w: 80,
    h: 50,

    speed: 20,
    action: false,

    pad: 5,
    pupilR: 6,
    pupilS: 8,

    color: {
        strip: '#302020',
        eyeballs: '#ffffff',
        pupils: '#000000',
    }
}

const chroma = {
    pupils: [
        '#000000', // black
        '#100560', // deep blue
        '#594109', // brown
        '#802010', // red
    ],
    strip: [
        '#20202060',
        '#40404060',
    ],
}

let instances = 0
const Ghost = function(dat) {
    this.name = 'ghost' + ++instances
    this.color = {}
    sys.supplement(this, defaults)

    this.color.pupils = chroma.pupils[lib.math.rndi(chroma.pupils.length)]
    this.color.strip = chroma.strip[lib.math.rndi(chroma.strip.length)]

    sys.augment(this, dat)
}

Ghost.prototype.touch = function(x, y, fn) {
    const lx = x - this.x
    const ly = y - this.y
    if (lx >= 0 && lx <= this.w && ly >= 0 && ly <= this.h) {
        if (sys.isFun(fn)) fn(this, lx, ly)
        return true
    }
    return false
}

Ghost.prototype.drawEye = function(cx, cy, hr, vr) {
    ctx.fillStyle = this.color.eyeballs
    ctx.beginPath();
    ctx.ellipse(cx, cy, hr, vr, 0, 0, 2*Math.PI);
    ctx.fill();

    // pupils
    ctx.fillStyle = this.color.pupils

    let px = 0
    let py = 0
    if (this.lookAt && this.lookAt.x !== undefined
            && !this.touch(this.lookAt.x, this.lookAt.y)) {
        const a = lib.math.bearing(cx, cy, this.lookAt.x, this.lookAt.y)
        px = Math.sin(a) * this.pupilS
        py = Math.cos(a) * this.pupilS
    } else {
        // look straight
    }
    ctx.beginPath();
    ctx.arc(cx + px, cy + py, this.pupilR, 0, 2*Math.PI);
    ctx.fill();
}

Ghost.prototype.draw = function() {
    ctx.fillStyle = this.color.strip
    ctx.fillRect(this.x, this.y, this.w, this.h)

    // calculate base points and dimensions
    const hr = this.w/4 - this.pad
    const vr = this.h/2 - this.pad
    const cx1 = this.x + (this.w/2 - hr - this.pad)
    const cx2 = this.x + (this.w/2 + hr + this.pad)
    const cy = this.y + (this.h/2)

    // eyeballs
    this.drawEye(cx1, cy, hr, vr)
    this.drawEye(cx2, cy, hr, vr)
}

Ghost.prototype.pickAction = function() {

    let action
    let i = lib.math.rndi(3)

    switch(i) {
    case 0: 
        action = {
            title: 'waiting',
            time: lib.math.rndi(8) + 2,

            fn: function(actor, dt) {
                actor.action.time -= dt
                if (actor.action.time < 0) {
                    log.out(actor.name + ' stopped waiting')
                    actor.action = false
                }
            }
        }
        break;

    case 1:
        action = {
            title: 'looking at cursor',
            time: lib.math.rndi(10) + 5,

            fn: function(actor, dt) {
                actor.lookAt = {
                    x: env.mouseX,
                    y: env.mouseY,
                }
                actor.action.time -= dt
                if (actor.action.time < 0) {
                    log.out(actor.name + ' stopped looking at cursor')
                    actor.action = false
                }
            }

        }
        break;

    case 2:
        action = {
            title: 'moving to a random location',
            x: lib.math.rndi(this.__.w),
            y: lib.math.rndi(this.__.h),

            fn: function(actor, dt) {
                actor.lookAt = {
                    x: action.x,
                    y: action.y,
                }
                const a = lib.math.bearing(actor.x, actor.y, actor.action.x, actor.action.y)
                const dx = Math.sin(a) * actor.speed * dt
                const dy = Math.cos(a) * actor.speed * dt

                actor.x += dx
                actor.y += dy

                if (lib.math.distance(actor.x, actor.y, actor.action.x, actor.action.y) < 10) {
                    // achieved!
                    log.out(actor.name + ' reached target coordinates @' + actor.action.x + 'x' + actor.action.y)
                    actor.action = false
                }
            }
        }
        break;
            
    }
    return action
}

Ghost.prototype.evo = function(dt) {
    if (this.action) {
        this.action.fn(this, dt)
    } else {
        this.action = this.pickAction()
    }
}

module.exports = Ghost

