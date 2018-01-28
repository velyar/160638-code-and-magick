'use strict';

var MIN_HEIGHT = 10;
var MAX_HEIGHT = 120;
var DIFF = MAX_HEIGHT - MIN_HEIGHT;
var NAME_Y = 250;
var COLUMN_MARGIN = 50;
var COLUMN_WIDTH = 40;
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
var COLUMN_BOTTOM = 225;
var NAME_MARGIN = 10;


// Функция для поиска наилучшего и наихудшего времени
// Самый высокий и самый низкий столбец от которых будет пропорция других результатов
function getCustomElement(array, comparator) {
  var findedElement = array[0];
  for (var i = 0; i < array.length; i++) {
    if (comparator(findedElement, array[i])) {
      findedElement = array[i];
    }
  }
  return findedElement;
}

// Функция поиска высот
function getHeights(times) {
  var minHeight = getCustomElement(times, function (a, b) {
    return a > b;
  });
  var maxHeight = getCustomElement(times, function (a, b) {
    return a < b;
  });

  var heights = [];
  var newHeight = 0;
  var prop = 0;

  for (var i = 0; i < times.length; i++) {
    newHeight = MIN_HEIGHT;
    prop = (times[i] - minHeight) / (maxHeight - minHeight);
    newHeight += DIFF * prop;
    heights.push(Math.floor(newHeight));
  }
  return heights;
}

// Функция отрисовки одного имени
function renderName(name, ctx, position) {
  ctx.fillText(name, position, NAME_Y);
}

// Функция выбора радномной прозрачности синиго цвета
function getRandomBlueColor() {
  return 'rgba(0, 0, 255, ' + (0.1 + Math.random() * 0.9) + ')';
}

// Функция отрисовки облака
function renderCloud(ctx) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = '#fff';
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);
}

// Функция отрисовки и заливки одного столбика гистограммы
function renderColumn(ctx, time, height, name, position) {
  if (name === 'Вы') {
    ctx.fillStyle = PLAYER_COLOR;
  } else {
    ctx.fillStyle = getRandomBlueColor();
  }
  ctx.fillRect(
      position,
      COLUMN_BOTTOM - height,
      COLUMN_WIDTH,
      height
  );
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillText(
      Math.floor(time),
      position,
      COLUMN_BOTTOM - height - NAME_MARGIN
  );
}

// Функция отрисовки и заливки столбиков гистограммы
function renderColumns(ctx, times, heights, names) {
  for (var i = 0; i < times.length; i++) {
    var position = 150;
    var height = heights[i];
    var name = names[i];
    renderName(name, ctx, position);
    renderColumn(ctx, times, height, name, position);
    position += COLUMN_MARGIN + COLUMN_WIDTH;
  }
}

// Функция отрисовки статистики по всем игрокам
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx);
  var heights = getHeights(times);
  renderColumns(ctx, times, heights, names);
};
