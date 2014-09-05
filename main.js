;(function() {

})();
$(document).ready(function() {
	jQuery('#submit').unbind('click').click(function(e){
		e.preventDefault();
		var rows = jQuery('input#rows').val();
		var cols = jQuery('input#cols').val();
		var container = jQuery("div#tile-wrapper");
		makeGame(container, rows, cols);
	})
});
var setColor= function (row, col, color){
	var currTile = getTile(row, col);
	currTile.removeClass('red')
		.removeClass('blue')
		.removeClass('green')
		.addClass(color);

} 

var getTile = function (row , col){
	return jQuery('.tile-row:nth(' + row + ') > .tile:nth('
		 + col + ')');
}
var makeGame = function (container, rows, cols){
	jQuery('form#args').detach();
	var isValid = rows > 0 && cols > 0;
	jQuery('h1.green').text(isValid ? 1 : 0);
	jQuery('h1.blue').text(isValid ? rows*cols - 1 : 0);
	$curTileRow = jQuery("<div class='tile-row'></div>");
	$eachTile = jQuery("<div class='tile'></div>");
	var boardColors = [];
	for(curRow in rows){
		boardColors[curRow] = [];
		container.append($curTileRow);
		for(curCol in cols){
			console.log(curCol);
			container.append($eachTile);
			boardColors[curRow][curCol] = 'blue';
			setColor(curRow, curCol, 'blue');
		}
	}
};