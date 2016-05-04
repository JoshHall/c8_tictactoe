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
// $ajax to store locally
    var jsonObject = {'localDiv' : [] };
    var localTiles = $('div');
    for (var i=0; i < localTiles.length; i++) {
        jsonObject.localDiv[i] = localTiles[i].outerHTML;
    };

$.ajax({
    url: ,
    dataType: { json : JSON.stringify(jsonObject) },
    success: function(){
        
    }
})
    
    
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
        if ($(this).html() == '') {
            if (first_players_turn == true) {
                // place_marker($(this),'X');
                $(this).html('X').css({
                    "color": "limegreen",
                    "text-shadow": "0 0 5px lawngreen, 0 0 10px lawngreen, 0 0 15px lawngreen, 0 0 20px lawngreen"
                });
                first_players_turn = false;
                $('body').css({
                    "color": "crimson",
                    "text-shadow": "0 0 5px red, 0 0 10px red, 0 0 15px red, 0 0 20px red"
                });
                console.log('is now 2nd players turn');
                x_array[x_index] = $(this).attr('id');
                console.log(x_array[x_index]);
                x_numbered_array[x_index] = parseFloat($(this).attr('id'));
                console.log(x_numbered_array[x_index]);
                x_index++;
                console.log("new x index value: ", x_index);
                console.log("stringified x_array: ", x_array);
                console.log("numbered x_array: ", x_numbered_array);
            }
            else {
                $(this).html('O').css({
                    'color': "crimson",
                    "text-shadow": "0 0 5px red, 0 0 10px red, 0 0 15px red, 0 0 20px red"
                });
                first_players_turn = true;
                $('body').css({
                    "color": "limegreen",
                    "text-shadow": "0 0 5px lawngreen, 0 0 10px lawngreen, 0 0 15px lawngreen, 0 0 20px lawngreen"
                });
                console.log('is now first players turn');
                o_array[o_index] = $(this).attr('id');
                console.log(o_array[o_index]);
                o_numbered_array[o_index] = parseFloat($(this).attr('id'));
                console.log(o_numbered_array[o_index]);
                o_index++;
                console.log("new o index value: ", o_index);
                console.log("string o_array: ", o_array);
                console.log("numbered x_array: ", o_numbered_array);
            }
        }
    })
}





//Function to display stats
// function stats() {
//player 1 wins

//     $('p1win').html(++);
// //player 2 wins
//     $('p2win').html(++);
//
// }



