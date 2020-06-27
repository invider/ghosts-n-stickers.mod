module.exports = function setup() {
    // create top container
    // it is the central points for event handling to all components
    const hud = sys.spawn('hud/Hud', {
        name: 'hud'
    })

    const eyes = sys.augment(sys.spawn('hud/gadget/Eyes', {
        name: 'eyes',
        x: 20,
        y: 20,
    }, 'hud'), dna.hud.trait.Draggable)
    sys.after(trap, 'mouseDown', function(e) {
        eyes.pupilR = 8
    })
    sys.after(trap, 'mouseUp', function(e) {
        eyes.pupilR = 6
    })


    let spawnButton = sys.spawn('hud/gadget/Button', {
        x: ctx.width/2 - 100,
        y: ctx.height - 50,
        w: 100,
        h: 40,
        text: 'Spawn',
        onClick: function(x, y) {
            const ghost = sys.augment(sys.spawn('Ghost', {
                x: lib.math.rndi(ctx.width-200) + 100,
                y: lib.math.rndi(ctx.height-200) + 100,
            }, 'hud'), dna.hud.trait.Draggable)
            return false
        },
    }, 'hud')

    let blockButton = sys.spawn('hud/gadget/Button', {
        x: ctx.width/2 + 40,
        y: ctx.height - 50,
        w: 80,
        h: 40,
        text: 'Block',
        onClick: function(x, y) {
            const block = sys.augment(sys.spawn('Block', {
                x: lib.math.rndi(ctx.width-200) + 100,
                y: lib.math.rndi(ctx.height-200) + 100,
                c: 0,
            }, 'hud'), dna.hud.trait.Draggable)
            return false
        },
    }, 'hud')

    let tagButton = sys.spawn('hud/gadget/Button', {
        x: ctx.width/2 + 130,
        y: ctx.height - 50,
        w: 80,
        h: 40,
        text: 'Letter',
        onClick: function(x, y) {
            const block = sys.augment(sys.spawn('Block', {
                x: lib.math.rndi(ctx.width-200) + 100,
                y: lib.math.rndi(ctx.height-200) + 100,

                textColor: '#202030',
                color: lib.math.rnde([
                    '#ad6e94',
                    '#a5ce80',
                    '#67c4ce',
                    '#6789ef',
                    '#ed8497',
                    '#edbe84',
                ]),
            }, 'hud'), dna.hud.trait.Draggable)
            return false
        },
    }, 'hud')


    function spawnLine(text, color, textColor, x, y) {
        text.split("").forEach(s => {
            let block = sys.augment(sys.spawn('Block', {
                x: x,
                y: y,
                color: color,
                textColor: textColor,
                c: s.charCodeAt(0),
            }, 'hud'), dna.hud.trait.Draggable)
            x += block.w + 4
        })
    }

    spawnLine('BANK', '#128e39' , '#c6ff38', ctx.width - 450, 50)

    spawnLine('POST', '#105e20' , '#908058', 300, 50)

    spawnLine('POLICE', '#066482', '#062f35', ctx.width - 500, ctx.height - 400)

    spawnLine('HOSPITAL', '#f4966e', '#42332d', 200, ctx.height - 400)

    /*
    let panel = lab.hud.attach(new dna.hud.Container({
        name: 'panel', x: 50, y: 50, w: 600, h: 250, clip: false,
    }))

    let l1 = sys.spawn('hud/gadget/Label', {
        name: 'label1', x: 50, y: 20, text: 'hello here from label',
        onMouseDrag: function(dx, dy) {
            this.x += dx
            this.y += dy
        }
    }, 'hud')

    let l2 = lab.hud.panel.attach(new dna.hud.gadget.Label('something is going on...'))
    l2.x = 300
    l2.y = 100
    sys.augment(l2, dna.hud.trait.Draggable)

    let title = sys.spawn('hud/gadget/Button', {
        x: 0,
        y: 0,
        w: 600,
        h: 40,
        text: 'Our Window',
        onClick: function(x, y) {
            //log.out('click on [' + this.name + '] @' + x + 'x' + y)
            return false
        },
        onMouseDrag: function(dx, dy, e) {
            this.__.x += dx
            this.__.y += dy
        }
    }, 'hud/panel')

    let b1 = sys.spawn('hud/gadget/Button', {
        x: 20,
        y: 80,
        text: 'Click Me',
        onClick: function(x, y) {
            this.toggled = !this.toggled
            //log.out('click on [' + this.name + '] @' + x + 'x' + y)
        },
        onMouseDown: function(x, y, e) {
            this.__.captureMouse(this)
        },
        onMouseUp: function(x, y, e) {
        },
        onMouseMove: function(dx, dy, e) {
            if (this._captured) {
                this.x += dx
                this.y += dy
            }
        },
    }, 'hud/panel')
    */

    /*
    sys.spawn('hud/gadget/Progress', {
        x: 40,
        y: 400,
        value: 0,
        evo: function(dt) {
            this.value += dt*4.2
            if (this.value > this.maxValue) this.value = 0
        },
        onMouseDrag: function(dx, dy, e) {
            this.x += dx
            this.y += dy
        }
    }, 'hud')

    sys.spawn('hud/gadget/Progress', {
        x: 80,
        y: 440,
        h: 250,
        w: 50,
        value: 0,
        evo: function(dt) {
            this.value += dt
            if (this.value > this.maxValue) this.value = 0
        },
        onMouseDrag: function(dx, dy, e) {
            this.x += dx
            this.y += dy
        }
    }, 'hud')
    */

    /*
    const scrollbar = sys.spawn('hud/gadget/ScrollBar', {
        x: 660,
        y: 50,
        w: 15,
        h: 250,
        horizontal: false,
        barPadding: 2,

        max: 99,
        span: 20,
        step: 10,
        scrollSpeed: 3,
    }, 'hud')
    */

    /*
    const list = []
    for (let i = 0; i < 30; i++) {
        list.push('#' + i + ' - ' + lib.math.rndi(100))
    }
    */

    /*
    const explorer = sys.spawn('hud/gadget/Explorer', {
        x: 50,
        y: ctx.height - 450,
        w: 250,
        h: 400,
    }, 'hud')
    */
}
