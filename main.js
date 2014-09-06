;(function() {
	var Board = {
		boardColors = [],
		rows : 0,
		cols : 0
	}

	$(document).ready(function() {
		jQuery('#submit').unbind('click').click(function(e){
			e.preventDefault();
			var rows = jQuery('input#rows').val();
			var cols = jQuery('input#cols').val();
			Board.rows = rows;
			Board.cols = cols;
			var container = jQuery("div#tile-wrapper");
			makeGame(container, rows, cols);
		});

		jQuery('div.tile').click(function (){
			var clickedTile = jQuery(this);
			if(clickedTile.hasClass('green')){
				var clickedRowNum = clickedTile.parent().index();
				var clickedColNum = clickedTile.index();
			}
		});
	});
	var setColor = function (row, col, color){
		var currTile = getTile(row, col);
		currTile.removeClass('red')
			.removeClass('blue')
			.removeClass('green')
			.addClass(color);

		Board.boardColors[row][col] = color;

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
		//$curTileRow = jQuery("<div class='tile-row'></div>");
		//$eachTile = jQuery("<div class='tile'></div>");
		
		for(var curRow = 0; curRow < rows; curRow++){
			boardColors[curRow] = [];
			container.append("<div class='tile-row'></div>");
			for(var curCol = 0; curCol < cols; curCol++){
				console.log(curCol);
				container.find('div.tile-row:nth(' + curRow + ')').append("<div class='tile'></div>");
				setColor(curRow, curCol, 'blue');
			}
		}
		setColor(0,0,'green')
	};
})();