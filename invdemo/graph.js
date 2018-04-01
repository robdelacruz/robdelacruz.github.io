/*
Types
-----
Graph

Graph
-----
NewGraph(cv:HTMLCanvasElement, wcell:number):Graph
GraphRect(g):Rect
GraphClear(g, pi:number)
GraphPlot(g, x,y:number, pi:number)
GraphDrawFrame(g, x,y:number, frame:Frame)
GraphDrawSprite(g, sp:Sprite)
GraphDrawText(g, x:number, y:number, s:string, fi:number, pi:number)

*/
import { SprCurrentFrame } from "./sprite.js";
const Palette = [
    "#000",
    "#F33",
    "#5F5",
    "#77F",
    "#0FF",
    "#BBB",
    "#DDD",
];
const Fonts = [
    "25px Helvetica",
    "25px sans-serif",
];
function NewGraph(cv, wcell) {
    let g = {
        cv: cv,
        ctx: cv.getContext("2d"),
        wcell: wcell || 5,
    };
    return g;
}
function GraphRect(g) {
    const cv = g.cv;
    return {
        x: 0,
        y: 0,
        w: Math.floor(cv.width / g.wcell),
        h: Math.floor(cv.height / g.wcell),
    };
}
function GraphClear(g, pi) {
    const cv = g.cv;
    const ctx = g.ctx;
    ctx.fillStyle = Palette[pi];
    ctx.fillRect(0, 0, cv.width, cv.height);
}
function GraphPlot(g, x, y, pi) {
    const wc = g.wcell;
    const ctx = g.ctx;
    ctx.fillStyle = Palette[pi];
    ctx.fillRect(x * wc, y * wc, wc, wc);
}
function GraphDrawFrame(g, x, y, frame) {
    const charCodeZero = "0".charCodeAt(0);
    const topx = x;
    const topy = y;
    for (let y = 0; y < frame.length; y++) {
        const srow = frame[y];
        for (let x = 0; x < srow.length; x++) {
            const pi = srow.charCodeAt(x) - charCodeZero;
            if (pi == 0) {
                continue;
            }
            GraphPlot(g, topx + x, topy + y, pi);
        }
    }
}
function GraphDrawSprite(g, spr) {
    GraphDrawFrame(g, spr.x, spr.y, SprCurrentFrame(spr));
}
function GraphDrawText(g, x, y, s, fi, pi) {
    const wc = g.wcell;
    const ctx = g.ctx;
    ctx.font = Fonts[fi];
    ctx.fillStyle = Palette[pi];
    ctx.fillText(s, x * wc, y * wc);
}
export { NewGraph, GraphRect, GraphClear, GraphPlot, GraphDrawFrame, GraphDrawSprite, GraphDrawText, };
