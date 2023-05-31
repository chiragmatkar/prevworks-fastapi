const treatment = {
    "head": "<a href=\"/head\">Head</a><br>",
    "shoulder-right": " <a href=\"/shoulder\">Shoulder</a><br>",
    "shoulder-left": "  <a href=\"/shoulder\">Shoulder</a><br>",
    "upper-arm-right": " <a href=\"/arm\">Arm</a><br>",
    "upper-arm-left": " <a href=\"/arm\">Arm</a><br>",
    "lower-arm-right": " <a href=\"/arm\">Arm</a><br>",
    "lower-arm-left": " <a href=\"/arm\">Arm</a><br>",
    "elbow-right": " <a href=\"/elbow\">Elbow</a><br>",
    "elbow-left": " <a href=\"/elbow\">Elbow</a><br>",
    "chest": " <a href=\"/chest\">Chest</a><br>",
    "stomach": " <a href=\"/stomach\">Stomach</a><br>",
    "hand-right-wrist": " <a href=\"/wrist\">Wrist</a><br>",
    "hand-left-wrist": " <a href=\"/wrist\">Wrist</a><br>",
    "hand-right": " <a href=\"/hand\">Hand</a><br>",
    "hand-left": " <a href=\"/hand\">Hand</a><br>",
    "finger-right-thumb": " <a href=\"/hand\">Hand</a><br>",
    "finger-right-index": " <a href=\"/hand\">Hand</a><br>",
    "finger-right-middle": " <a href=\"/hand\">Hand</a><br>",
    "finger-right-ring": " <a href=\"/hand\">Hand</a><br>",
    "finger-right-little": " <a href=\"/hand\">Hand</a><br>",
    "finger-left-thumb": " <a href=\"/hand\">Hand</a><br>",
    "finger-left-index": " <a href=\"/hand\">Hand</a><br>",
    "finger-left-middle": " <a href=\"/hand\">Hand</a><br>",
    "finger-left-ring": " <a href=\"/hand\">Hand</a><br>",
    "finger-left-little": " <a href=\"/hand\">Hand</a><br>",
    "upper-leg-right": " <a href=\"/leg\">Leg</a><br>",
    "upper-leg-left": " <a href=\"/leg\">Leg</a><br>",
    "lower-leg-right": " <a href=\"/leg\">Leg</a><br>",
    "lower-leg-left": " <a href=\"/leg\">Leg</a><br>",
    "knee-right": " <a href=\"/knee\">Knee</a><br>",
    "knee-left": " <a href=\"/knee\">Knee</a><br>",
    "ankle-right": " <a href=\"/ankle\">Ankle</a><br>",
    "ankle-left": " <a href=\"/ankle\">Ankle</a><br>",
    "foot-right": " <a href=\"/foot\">Foot</a><br>",
    "foot-left": " <a href=\"/foot\">Foot</a><br>",
    "neck": " <a href=\"/neck\">Neck</a><br>",
    "hips": " <a href=\"/hips\">Hip</a><br>",
    "back": " <a href=\"/back\">Back</a><br>"

};

window.onload = function() {

    const front_pieces = document.getElementsByClassName('human-front');
    var flag = 0;
    var arr = new Array();
    for (var i = 0; i < front_pieces.length; i++) {
        let back_piece = front_pieces[i];
        back_piece.onclick = function(t) {
            var pflag = document.getElementById('flag').value;
            console.log(pflag);
            if (flag === 0) {
                document.getElementById('data').innerHTML = "";
                if (document.getElementById('flag').value == "2") {
                    document.getElementById('recommendation').innerHTML = "";
                }

                flag++;
            }
            //Body part selected
            if (t.target.getAttribute('data-position') != null) {
                //To delete already selected
                if (arr.includes(t.target.getAttribute('data-position'))) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] === t.target.getAttribute('data-position')) {
                            arr.splice(i, 1);
                            i--; // Since the indexes of elements following this index get updated after removal
                        }
                    }
                    //Duplicate click to remove body parts
                    document.getElementById('data').innerHTML = "";
                    if (document.getElementById('flag').value == "2") {
                        document.getElementById('recommendation').innerHTML = "";
                    }

                    for (var i = 0; i < arr.length; i++) {
                        document.getElementById('data').innerHTML += arr[i] + " ";
                        if (document.getElementById('flag').value == "2") {
                            document.getElementById('recommendation').innerHTML += treatment[arr[i]];
                        }

                        console.log(arr[i]);

                    }
                    if (arr.length === 0) {
                        document.getElementById('data').innerHTML = "None";
                        if (document.getElementById('flag').value == "2") {
                            document.getElementById('recommendation').innerHTML = "None";
                        }

                        flag = 0;
                    }

                    document.getElementsByClassName(t.target.getAttribute('data-position'))[0].style.fill = '#57c9d5';

                } else {
                    document.getElementById('data').innerHTML += t.target.getAttribute('data-position') + " ";
                    arr.push(t.target.getAttribute('data-position'));
                    var part = t.target.getAttribute('data-position');
                    if (document.getElementById('flag').value == "2") {
                        document.getElementById('recommendation').innerHTML += treatment[part];
                    }


                    document.getElementsByClassName(t.target.getAttribute('data-position'))[0].style.fill = '#ff7d16';
                }
            }
        }

    }

    const back_pieces = document.getElementsByClassName('human-back');
    console.log(back_pieces.length);

    for (var i = 0; i < back_pieces.length; i++) {
        let back_piece = back_pieces[i];

        back_piece.onclick = function(t) {
            //if (t.target.getAttribute('data-position') != null) document.getElementById('data').innerHTML = t.target.getAttribute('data-position');
            if (flag === 0) {
                document.getElementById('data').innerHTML = "";
                if (document.getElementById('flag').value == "2") {
                    document.getElementById('recommendation').innerHTML = "";
                }
                flag++;
            }
            //Body part selected
            if (t.target.getAttribute('data-position') != null) {
                //Check duplicate and remove
                if (arr.includes(t.target.getAttribute('data-position'))) {
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === t.target.getAttribute('data-position')) {
                            arr.splice(i, 1);
                            i--;
                        }
                    }
                    //Duplicate click to remove body parts
                    document.getElementById('data').innerHTML = "";
                    if (document.getElementById('flag').value == "2") {
                        document.getElementById('recommendation').innerHTML = "";
                    }

                    for (let i = 0; i < arr.length; i++) {
                        document.getElementById('data').innerHTML += arr[i] + " ";
                        if (document.getElementById('flag').value == "2") {
                            document.getElementById('recommendation').innerHTML += treatment[arr[i]];
                        }
                    }
                    //When non selected
                    if (arr.length === 0) {
                        document.getElementById('data').innerHTML = "None";
                        if (document.getElementById('flag').value == "2") {
                            document.getElementById('recommendation').innerHTML = "None";
                        }
                        flag = 0;
                    }
                    document.getElementsByClassName(t.target.getAttribute('data-position'))[0].style.fill = '#57c9d5';

                } else {
                    document.getElementById('data').innerHTML += t.target.getAttribute('data-position') + " ";
                    arr.push(t.target.getAttribute('data-position'));
                    var part = t.target.getAttribute('data-position');
                    if (document.getElementById('flag').value == "2") {
                        document.getElementById('recommendation').innerHTML += treatment[part];
                    }

                    arr.push(t.target.getAttribute('data-position'));
                    document.getElementsByClassName(t.target.getAttribute('data-position'))[0].style.fill = '#ff7d16';
                }
            }
        }
    }

}
$('#button').click(function() {
    $("#colormethis").toggleClass('active');
});