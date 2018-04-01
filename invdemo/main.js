import { NewGraph } from "./graph.js";
import { NewScene, ScnAddInvaders, ScnAddShip, ScnUpdate, ScnDraw, ScnHandleKBEvent } from "./scene.js";
function main() {
    const cv = document.getElementById("canvas1");
    let graph = NewGraph(cv, 4);
    const scn = NewScene(graph);
    ScnAddInvaders(scn);
    ScnAddShip(scn);
    const fps = 30;
    setInterval(function () {
        ScnUpdate(scn);
        ScnDraw(scn);
    }, 1000.0 / fps);
    window.addEventListener("keydown", function (e) {
        ScnHandleKBEvent(scn, e);
    });
    window.addEventListener("keyup", function (e) {
        ScnHandleKBEvent(scn, e);
    });
}
main();
