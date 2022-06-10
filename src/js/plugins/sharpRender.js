/** /*:
 * @plugindesc Grants a sharper image rendering, improving graphics.
 * @author William Ramsey
 * 
 * @help
 * Made by youtube.com/TheUnproPro
 * 
 * Basically, this turns your canvas rendering sharp instead of blurry.
 */
const css = `canvas {
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
}`;

document.body.innerHTML += `<style>${css}</style>`;