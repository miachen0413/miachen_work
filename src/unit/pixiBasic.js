import * as PIXI from 'pixi.js'

export function getPIXISprite(texture, x = 0, y = 0) {
  const sprite = new PIXI.Sprite(texture);
  sprite.position.set(x, y)
  return sprite
}