export const ColorList = (sort = 0) => {
  let list = [
    '#fbb8ab','#f499a2','#c3cfef','#95c4c0','#bbf6f0',
    '#43e8d8','#beb387','#f5e8b8','#665a3f','#54673a',
    '#fff68f','#ffa500','#ff7f50','#ff4040','#ff4040',
    '#c6e2ff','#3399ff','#99ea44','#d3ffce','#40e0d0',
    '#f7347a','#a0c0fb','#3bd6c6','#4b86b4','#21669b',
    '#024a81','#3b745b','#489281','#3f78bf','#844185',
    '#876880','#554562','#ffd700','#05a05a','#ff00aa',
    '#ff5500','#ff0055','#2f4661','#c23232','#eedcff'
  ]
  return list[sort];
}