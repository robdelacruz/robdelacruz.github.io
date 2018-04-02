/*
Types
-----
ActionCB
ActionsTbl

ActionsTbl
----------
NewActionsTbl():ActionsTbl
ActionsTblAddAction(at, actionID:string, fn:ActionCB)
ActionsTblUpdate(at)

*/
function NewActionsTbl() {
    return {
        fns: {},
        lastTimes: {},
    };
}
function ActionsTblAddAction(at, actionID, fn) {
    at.fns[actionID] = fn;
    const msNow = new Date().getTime();
    at.lastTimes[actionID] = msNow;
}
function ActionsTblUpdate(at) {
    const msNow = new Date().getTime();
    for (const actionID in at.fns) {
        let msLastTime = at.lastTimes[actionID];
        const msElapsed = msNow - msLastTime;
        const actionFn = at.fns[actionID];
        if (actionFn(msElapsed) == true) {
            at.lastTimes[actionID] = msNow;
        }
    }
}
export { NewActionsTbl, ActionsTblAddAction, ActionsTblUpdate, };
