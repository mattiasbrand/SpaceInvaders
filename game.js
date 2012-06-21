var _canvasWidth;
var _canvasHeight;
var _ctx;
var _intervalId = 0;

// Player
var _playerX;
var _playerHeight = 20;
var _playerWidth = 15;
var _playerColor = "#FF00FF";
var _rightDown = false;
var _leftDown = false;
var _playerSpeed = 5;

// Missile
var _missileX;
var _missileY;
var _missileHeight = 10;
var _missileWidth = 5;
var _missileOnScreen = false;
var _missileStartY = 50;
var _missileColor = "#FF0000";
var _missileSpeed = 10;

// Enemy
var _enemyX = 100;
var _enemyY = 60;
var _enemyHeight = 40;
var _enemyWidth = 50;
var _enemyDirection = 1;
var _enemySpeed = 5;
var _enemyColor = "#FF000F";

var _backColor = "#000000";


function onKeyDown(evt) {
    if (evt.keyCode === 39)
        _rightDown = true;
    else if (evt.keyCode === 37)
        _leftDown = true;
    else if (evt.keyCode === 32)
        fireMissile();
}
function onKeyUp(evt) {
    if (evt.keyCode == 39)
        _rightDown = false;
    else if (evt.keyCode == 37)
        _leftDown = false;
}

function init() {
    _ctx = $('#canvas')[0].getContext("2d");
    _canvasWidth = $("#canvas").width();
    _canvasHeight = $("#canvas").height();

    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);

    _playerX = _canvasWidth / 2;
    _intervalId = setInterval(draw, 10);
    return _intervalId;
}

function drawRect(x, y, w, h) {
    _ctx.beginPath();
    _ctx.rect(x, y, w, h);
    _ctx.closePath();
    _ctx.fill();
}
function clear() {
    _ctx.clearRect(0, 0, _canvasWidth, _canvasHeight);
}
function drawVictoryText() {
    _ctx.beginPath();
    _ctx.font = 'bold 10px sans-serif';
    _ctx.fillText('Congrats!', 10, 10);
    _ctx.closePath();
    _ctx.fill();
}
function drawEnemy() {
    if(_enemyDirection === 1) {
        if(_enemyX > _canvasWidth - _enemyWidth) { _enemyDirection = 2; }
        else _enemyX += _enemySpeed;
    }
    else {
        if(_enemyX < 0) { _enemyDirection = 1; }
        else _enemyX -= _enemySpeed;
    }

    _ctx.fillStyle = _enemyColor;
    drawRect(_enemyX, _enemyY, _enemyWidth, _enemyHeight);
}
function drawPlayer() {
    if (_rightDown) {
        _playerX += _playerSpeed;
    }
    else if (_leftDown) {
        _playerX -= _playerSpeed;
    }

    _ctx.fillStyle = _playerColor;
    drawRect(_playerX, _canvasHeight - _playerHeight, _playerWidth, _playerHeight);
}

function fireMissile() {
    if(_missileOnScreen === true) return;
    _missileOnScreen = true;
    _missileX = _playerX;
    _missileY = _canvasHeight-_missileStartY;
}
function drawMissile() {
    if(_missileOnScreen === false) return;

    if(_missileY < 0) {
        _missileOnScreen = false;
        return;
    }

    _missileY -= _missileSpeed;
    _ctx.fillStyle = _missileColor;
    drawRect(_missileX, _missileY, _missileWidth, _missileHeight);
}
function missileHit() {
    if(_missileOnScreen === false) return;
    if(_missileY > _enemyY + _enemyHeight || _missileY + _missileHeight < _enemyY) return false;
    if(_missileX + _missileWidth < _enemyX || _missileX > _enemyX + _enemyWidth) return false;
    return true;
}

function draw() {
    _ctx.fillStyle = _backColor;
    clear();

    drawPlayer();
    drawEnemy();
    drawMissile();

    if(missileHit()) {
        clearInterval(_intervalId);
        drawVictoryText();
    }
}

$(document).ready(function () {
    init();
    initbricks();
});