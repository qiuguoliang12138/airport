
import { _decorator, Component, Node, Vec3, SystemEvent, systemEvent, EventMouse, UITransform} from 'cc';
import * as cc from 'cc'
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = airport
 * DateTime = Sat Dec 04 2021 12:32:33 GMT+0800 (中国标准时间)
 * Author = qichuangjiuxuexi
 * FileBasename = airport.ts
 * FileBasenameNoExtension = airport
 * URL = db://assets/script/airport.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('airport')
export class airport extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    private _deltaPos: Vec3 = new Vec3(0, 0, 0);
    private isTouchAirport = false;
    start () {
        // [3]
        systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
        systemEvent.on(SystemEvent.EventType.MOUSE_DOWN, this.onMouseDown, this);
        systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchStart,this);
        
    }

    update (deltaTime: number) {
        
    }

    onMouseUp(event: EventMouse) {
        // console.log(222222222);         
    }
    onMouseDown(event: EventMouse) {
        var pickX = event._prevX;
        var pickY  = event._prevY;
        var size = this.node.getContentSize();
        if(Math.abs(pickX-(this.node.getPosition().x + 1/2 * cc.view.getCanvasSize().width)) <=  size.width && 
           Math.abs(pickY-(this.node.getPosition().y + 1/2 * cc.view.getCanvasSize().height)) <=  size.height) {
            this.isTouchAirport = true;
        }else {
            this.isTouchAirport = false;
        }
    }

    onTouchStart(touch: Touch, event: EventTouch){
        if(!this.isTouchAirport) return;
        var nowX = event.getLocationX();
        var nowY = event.getLocationY();
        var oldX = event.getPreviousLocation().x;
        var oldY = event.getPreviousLocation().y;
        this._deltaPos.x +=(nowX - oldX);
        this._deltaPos.y +=(nowY - oldY);
        this.node.setPosition(this._deltaPos);
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
