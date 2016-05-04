/**
 * Created by hallj on 5/3/2016.
 */
//Global variables
var dimension = 3;
//below is the slider input
var user_input;
var first_players_turn=true;

var div_dimensions = (30 / dimension) + "vw";
var text_size = (15 / dimension) + "vw";
var number_of_tiles = 7;
var clone;
var x_array=[];
var o_array=[];
var x_numbered_array=[];
var o_numbered_array=[];
var x_index=0;
var o_index=0;
//DOC READY/CLICK HANDLERS
$(document).ready(function(){
    // $('.plus').on('click', board_maker_plus);
    clone = $('.game_area').clone(true);
    $('.reset').on('click', reset_board);

    $('.tile').css({"width": div_dimensions, "height": div_dimensions, "font-size":text_size}).on('click', function() {




        if($(this).html()=='') {
            if (first_players_turn == true) {
                // place_marker($(this),'X');
                $(this).html('X').css({"color":"limegreen", "text-shadow":"0 0 5px lawngreen, 0 0 10px lawngreen, 0 0 15px lawngreen, 0 0 20px lawngreen"});
                first_players_turn = false;
                console.log('is now 2nd players turn');
                $('body').css({"color":"crimson", "text-shadow":"0 0 5px red, 0 0 10px red, 0 0 15px red, 0 0 20px red"});
                x_array[x_index]=$(this).attr('id');
                console.log(x_array[x_index]);
                x_numbered_array[x_index]=parseFloat($(this).attr('id'));
                console.log(x_numbered_array[x_index]);
                x_index++;
                console.log("new x index value: ",x_index);
                console.log("stringified x_array: ",x_array);
                console.log("numbered x_array: ",x_numbered_array);
            }
            else{
                $(this).html('O').css({'color':"crimson", "text-shadow":"0 0 5px red, 0 0 10px red, 0 0 15px red, 0 0 20px red"});
                first_players_turn=true;
                console.log('is now first players turn');
                $('body').css({"color":"limegreen", "text-shadow":"0 0 5px lawngreen, 0 0 10px lawngreen, 0 0 15px lawngreen, 0 0 20px lawngreen"});
                o_array[o_index]=$(this).attr('id');
                console.log(o_array[o_index]);
                o_numbered_array[o_index]=parseFloat($(this).attr('id'));
                console.log(o_numbered_array[o_index]);
                o_index++;
                console.log("new o index value: ",o_index);
                console.log("string o_array: ",o_array);
                console.log("numbered x_array: ",o_numbered_array);
            }
        }
        else{
        return;
        }
    })
});



//
// //Function to check board size for win conditions
// function check_board_size() {
// //Switch statement to check 3x3/4x4 || 5x5-10x10 || 11x11-20x20
//     switch (dimension) {
//         case 3:
//         case 4:
//             size = small;
//             break;
//         case 5:
//         case 6:
//         case 7:
//         case 8:
//         case 9:
//         case 10:
//             size = medium;
//             break;
//         case 11:
//         case 12:
//         case 13:
//         case 14:
//         case 15:
//         case 16:
//         case 17:
//         case 18:
//         case 19:
//         case 20:
//             size = large;
//             break;
//         default:
//             size = small
//       }
//         if (size = small) {
//             check_win(3,3);
//         }
//         if (size = medium) {
//             check_win(5,5);
//         }
//         if (size = large) {
//             check_win(11,11);
//         }
// }
//
// //This function checks it the player has won by checking rows/diagonal/columns
// function check_win(x,y){
//
// //check rows
//
// //check columns
//
// //check diagonals
//
// //check draw
//
// }
//
//

//Function to place X or O and swap player
// function place_marker(clicked_tile, marker){
// //if statement for a spot already being used
//     clicked_tile.html(marker);
//     console.log(marker);
//     if(first_players_turn==true){
//         first_players_turn=false;
//         console.log('is now 2nd players turn');
//     }
//     else{
//         first_players_turn=true;
//         console.log('is now first players turn');
//     }
// }


//Function that Resets the gameboard
function reset_board(){
//resets gameboard but keeps all stats and wins
    $('.game_area').clone().append(clone);
}

//Function to switch boards
function board_maker_plus() {
    console.log('This was called');
//This will be the function that dynamically increases the gameboard size
    ++dimension;
    var tile_id = 10;
    div_dimensions = (30 / dimension) + "vw";
    text_size = (15 / dimension) + "vw";
    for (var i = 1; i <= number_of_tiles; i++) {
        var new_tile = $('<div>').addClass('tile').attr('id', tile_id).css({"width": div_dimensions, "height": div_dimensions, "font-size":text_size});
        $('.game_area').append(new_tile);
        tile_id++;
    }
    number_of_tiles += 2;
    $('.tile').css({"width": div_dimensions, "height": div_dimensions, "font-size":text_size}).on('click', function() {
        if($(this).html()=='') {
            if (first_players_turn == true) {
                // place_marker($(this),'X');
                $(this).html('X');
                first_players_turn = false;
                console.log('is now 2nd players turn');
            }
            else{
                $(this).html('O');
                first_players_turn=true;
                console.log('is now first players turn');
            }
        }
        else{
            return;
        }
    })
}





//Function to display stats
function stats() {
//player 1 wins

    $('p1win').html(i++);
//player 2 wins
    $('p2win').html(i++);

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

