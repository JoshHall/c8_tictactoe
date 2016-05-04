/**
 * Created by hallj on 5/3/2016.
 */
//Global variables
var dimension = 3;
var game_array = [];
//below is the slider input
var user_input;
var number_of_tiles = 7;
var clone = $('.game_area').clone(true);

$(document).ready( function(){
    $('.reset').on('click', reset_board);
})
//Function to check board size for win conditions
function check_board_size() {
//Switch statement to check 3x3/4x4 || 5x5-10x10 || 11x11-20x20
    switch (dimension) {
        case 3:
        case 4:
            size = small;
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            size = medium;
            break;
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
            size = large;
            break;
        default:
            size = small
      }
        if (size = small) {
            check_win(3,3);
        }
        if (size = medium) {
            check_win(5,5);
        }
        if (size = large) {
            check_win(11,11);
        }
}

//This function checks it the player has won by checking rows/diagonal/columns
function check_win(x,y){

//check rows

//check columns

//check diagonals

//check draw

}

//Function that Resets the gameboard
function reset_board(){
//resets gameboard but keeps all stats and wins
    $('.game_area').clone().append(clone);
}

//Function to switch boards
function board_maker_plus() {
//This will be the function that dynamically increases the gameboard size
    ++dimension;
    var tile_id = 10;
    for (var i = 1; i <= number_of_tiles; i++) {
        var new_tile = $('<div>').addClass('tile').attr('id', tile_id);
        tile_id++;
    }
    $('.game_area').append(new_tile);
    number_of_tiles += 2;
}





//Function to display stats
function stats() {
//player 1 wins
    $('p1win').html();
//player 2 wins
    $('p2win').html();
}

//$ajax to store locally
// $.ajax({
//     url:
//     method:
//     dataType:
//     success: function(stored_info){
//
//     }
// })






//Extra stuff
//
// for (var i=1; i <= dimension; i++) {
//     var row_class_name ='row' + i;
//     var new_row = '<div class="' + row_class_name + '"></div>';
//     console.log(new_row);
//     for (var j=1; j <= dimension; j++) {
//         var tile_class_name = 'tile' + j;
//         var new_tile = '<div class="' + tile_class_name + '"></div>';
//         console.log(new_tile);
//     }
//     $(new_row).append(new_tile);
//     game_array.push(new_row);
// }
// console.log(game_array);