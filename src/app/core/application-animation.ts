
import { animate, state, style, transition, trigger } from '@angular/animations';

export let fade = trigger("fade",[
    state('void',style({opacity:0})),
    transition("void => *, * => void",[
      animate(2000)
    ]),
])

export let slide = trigger("slide",[
    state('start',style({transform:'translateX(0px)'})),
    state('end',style({transform:'translateX(50px)'})),
    transition("start <=> end",[
        animate(300)
    ])
])

export let cartslide = trigger("cart-slide",[
    state('start',style({transform:'translateX(0px)',opacity:1})),
    state('end',style({transform:'translateX(500px)',opacity:0})),
    transition("start <=> end",[
        animate(200)
    ])
])

export let rotateAll = trigger("rotateAll",[
    state('start',style({transform:'rotate(0deg)'})),
    state('end',style({transform:'rotate(180deg)'})),
    transition('start <=> end',[
        animate(700)
    ])
])

export let rotateAndHide = trigger ('rotateAndHide',[
    state('start',style({
        transform:'translateX(0px)',
        opacity:1
    })),
    state('end',style({
        transform:'translateX(300px)',
        opacity:0
    })),
    transition('start <=> end',[
        animate(500)
    ])
])
