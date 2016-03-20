import { EventData } from "data/observable";
import { Page } from "ui/page";
import { View } from "ui/core/view";
import { LayoutBase } from "ui/layouts/layout-base";
import { Animation, AnimationDefinition } from "ui/animation";

var showAllBtn:View;
var buttonsContainer: LayoutBase;
export function navigatedTo(args: EventData) {
    showAllBtn = (<Page>args.object).getViewById("show-all");
    buttonsContainer = <LayoutBase>(<Page>args.object).getViewById("buttons");
}

export function fade(args: EventData) {
    var v = <View>args.object;
    v.animate({
        opacity: 0,
        scale: { x: 2, y: 2 },
        rotate: 270,
        curve: "easeIn",
        duration: 300
    })
    .then(buttonHidden);
}

export function dash(args: EventData) {
    var v = <View>args.object;
    v.animate({
        translate: { x: -50, y: 0 },
        scale: { x: 0.5, y: 1.4 },
        duration: 600,
        curve: "easeOut"
    }).then(() => {
        v.animate({
            translate: { x: 500, y: 0 },
            scale: { x: 2, y: 0.3 },
            curve: "easeIn",
            duration: 200
        })
    })
    .then(buttonHidden);
}

export function roll(args: EventData) {
    var v = <View>args.object;

    v.animate({  
        translate: { x: 400, y: 0 }, 
        rotate: 360,
        duration: 1500 })
    .then(buttonHidden);

}

export function worm(args: EventData) {
    var v = <View>args.object;
    var dur = 300;
    v.animate({  
        translate: { x: 50, y: 50 }, 
        scale: { x: 2, y: 0.3 }, 
        curve: "easeInOut",
        duration: dur })  
    .then(() => {
        return v.animate({  
            translate: { x: 100, y: 0 }, 
            scale: { x: 1, y: 1 },
            curve: "easeInOut",
            duration: dur })
    })
    .then(() => {
        return v.animate({  
            translate: { x: 150, y: 50 }, 
            scale: { x: 2, y: 0.3 },
            curve: "easeInOut",
            duration: dur }) 
    })
    .then(() => {
        return v.animate({  
            translate: { x: 200, y: 0 }, 
            scale: { x: 1, y: 1 },
            curve: "easeInOut",
            duration: dur })
    })
    .then(() => {
        return v.animate({  
            translate: { x: 250, y: 50 }, 
            scale: { x: 2, y: 0.3 },
            curve: "easeInOut",
            duration: dur }) 
    })
    .then(() => {
        return v.animate({  
            translate: { x: 300, y: 0 }, 
            scale: { x: 1, y: 1 },
            curve: "easeInOut",
            duration: dur })
    })
    .then(() => {
        return v.animate({  
            translate: { x: 350, y: 50 }, 
            scale: { x: 2, y: 0.3 },
            curve: "easeInOut",
            duration: dur }) 
    })
    .then(() => {
        return v.animate({  
            translate: { x: 400, y: 0 }, 
            scale: { x: 1, y: 1 },
            curve: "easeInOut",
            duration: dur })
    })
    .then(buttonHidden);
}

var hidden = 0;
function buttonHidden() {
    hidden ++;
    if(hidden === 4){
        showAllBtn.animate({
            translate: {x: 0, y:0},
            curve: "easeOut"
        })
        
    }   
}

export function showAll() {
    hidden = 0;
    var anims = new Array<AnimationDefinition>();
    for (var index = 0; index < buttonsContainer.getChildrenCount(); index++) {
        var view = buttonsContainer.getChildAt(index);
        view.opacity = 0;
        view.rotate = 0;
        view.translateX = 0;
        view.translateY = 0;
        view.scaleX = 1.5;
        view.scaleY = 1.5
        
        anims.push({
            target: view,
            opacity: 1,
            scale: {x: 1, y: 1}
        });
    }
    
    showAllBtn.animate({
        translate: {x: 0 , y: -400},
        curve: "easeOut"
    }).then(()=> {
        new Animation(anims).play();  
    });
}