/**
 * Created by Brown on 2/2/2015.
 */
$(document).ready(function(){
    console.log("RUNNING");
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var today =  (month+1) + "-" + day + "-" + year;
    var hour = date.getHours();
    var minute = date.getMinutes();



    var $newItemButton = $('#newItemButton');
    var $newItemForm = $('#newTitle');
    var $textInput = $('input:text');


    var i = localStorage.getItem('i');

    setup();

    $('#showForm').on('click',function(){
        $newItemButton.hide();
        $newItemForm.show();
        document.getElementById("title").focus();

    });



    //Hides add item form and stores addTask text in localStorage

    $newItemForm.on('submit',function(e){
        e.preventDefault();

        //Creates row and returns inputed task text
        var returnedINFO = createRow("",i,today, false,"","");
        var inputArray = {accessText: returnedINFO[0], accessDate : today,accessDueDate : returnedINFO[1],
            accessID : i, accessSoon : returnedINFO[2], accessDifficult : returnedINFO[3]};
        var inputJSON = JSON.stringify(inputArray);
        localStorage.setItem(i,inputJSON);

        $newItemForm.hide();
        $newItemButton.show();
        $textInput.val('');

        i++;

        localStorage.setItem("i",i);
        $('.button-o').click(function(e){
            this.parentNode.remove(this);
            localStorage.removeItem($(this).attr('id'));
           // refresh();

        });
        //refresh();
    });


    //deletes things and refreshes list (still in progress)

    /*
     $('table').on('click',function(e){
     e.preventDefault();
     var k = 0;
     while(k++<taskArray.length+1) {

     if (e.target == document.getElementById(k)){


     refresh();

     }
     }


     }
     );

     */

    $('.button-o').click(function(e){
        this.parentNode.remove(this);

        localStorage.removeItem($(this).attr('id'));
       //refresh();
    });







//recalls previous tasks from memory, stores in array, and places on page with correct taskindex
function setup(){
    $newItemButton.show();
    $newItemForm.hide();


    var Todayposition = document.getElementById("TodayIs");
    var todayIsText = document.createTextNode("Welcome : "+today);
    Todayposition.appendChild(todayIsText);


    var monthSelectionPosition = document.getElementById("month").children;
    monthSelectionPosition[month].setAttribute("selected","selected");

    var daySelectedPosition = document.getElementById("day").children;
    daySelectedPosition[day].setAttribute("selected","selected");

    //var timeSelectedPosition = document.getElementById("time");
    //var nowTime = hour+":" +minute
    //timeSelectedPosition.setAttribute("value",nowTime);




    if(i>1){

            for (var j=1;j<i ;j++){
                if(localStorage.getItem(j)!=null) {

                    var JSONOut = localStorage.getItem(j);
                    var parsedJSON = JSON.parse(JSONOut);
                    console.log(parsedJSON);
                    var inText = parsedJSON.accessText;
                    var inDate = parsedJSON.accessDate;
                    var inID = parsedJSON.accessID;
                    var inDueDate = parsedJSON.accessDueDate;
                    var soon = parsedJSON.accessSoon;
                    var difficult = parsedJSON.accessDifficult;

                    if (inText != null) {
                        createRow(inText, (inID), inDate, inDueDate, true, soon, difficult);

                    }
                }
            }
        }
};



   // window.addEventListener('load',setup,false);


//Shows add task form on click






//Adds array given either starting tasks via setup() or from $newItemForm click event
function createRow(text,j,inDateText,inDueDate, start, soon, difficult){

    if (!start){
        var taskText = $('input:text').val();
        var taskN = parseInt(i);
        var DateText = today;
        //var year = document.getElementById('year');;
        var month = document.getElementById('month').value;
        var day = document.getElementById('day').value;
        var dueDate = month + "-" + day + "-" + 2015;
        var difficulty = document.getElementById('difficult').checked;
        document.getElementById('difficult').checked = false;
        var soon = document.getElementById('soon').checked;
        document.getElementById('soon').checked = false;

    }

    else{
        var taskText = text;
        var taskN = parseInt(j);
        var DateText = inDateText;
        var dueDate = inDueDate;
        var difficulty = difficult;
        var soon = soon;

    }

    var compareDay = parseInt(dueDate.slice(2,4))- parseInt(today.slice(2,4))
    var compareMonth = parseInt(dueDate.slice(0,1))- parseInt(today.slice(0,1));


    var row = document.createElement('tr');



    var newTask = document.createElement('td');
    var taskTextNode = document.createTextNode(taskText);
    newTask.appendChild(taskTextNode);


        var dateColumn = document.createElement('td');
        var dateTextNode = document.createTextNode(DateText);

    dateColumn.appendChild(dateTextNode);


    var dueDateColumn = document.createElement('td');
    var dueDateColumnText = document.createTextNode(dueDate);
    dueDateColumn.appendChild(dueDateColumnText);

    var finishedColumn = document.createElement('td');
    var finishedText = document.createTextNode('\u2713');

    if (difficulty && soon){
        row.setAttribute('class','finished difficult soon');
    }
    else if (difficulty){
        row.setAttribute('class','finished difficult');

    }
    else if (soon || (compareDay < 4 && compareMonth === 0)){
        row.setAttribute('class','finished soon');

    }
    else{
        row.setAttribute('class','finished');

    }
    row.setAttribute('id', taskN);
    finishedColumn.setAttribute('id',taskN);
    finishedColumn.setAttribute('class','button-o');



    finishedColumn.appendChild(finishedText);

    row.appendChild(newTask);
    row.appendChild(dateColumn);
    row.appendChild(dueDateColumn);
    row.appendChild(finishedColumn);

    var position = document.getElementById('taskTable');
    position.appendChild(row);


    var returnedINFO  = [taskText,dueDate, soon, difficulty];
    return returnedINFO ;
}




//Refresh still in progress
var refresh = function(){

    var out = [];
    var position = document.getElementById('taskTable').firstChild.nextSibling;
    if (position.nextSibling!=null){

        for(var k = 1; k<localStorage.length; k++)
        {
            position = position.nextSibling;
            var nowID = position.getAttribute('id');
            var into = localStorage.getItem(nowID);
            var intoParsed =JSON.parse(into);

            out.push(intoParsed);
        }

        localStorage.clear();
        localStorage.setItem('i',1)


        for (var j=0; j<out.length; j++){
           // out[j].accessID = j+1;
            out[j].accessID = j+1;
            console.log(out[j]);
            console.log(out[j].accessID );
            console.log(out.length);

            var STRINGIN = JSON.stringify(out[j]);
            localStorage.setItem(j+1,STRINGIN);
            localStorage.setItem('i',j+1);

        }
        localStorage.setItem('i',out.length+1);




    }


};

/* If you look On JSON.Stringify | JSON.parse*/


/*
var returnIList = function (){
    for (var i =1;i<taskArray.length;i++){
        console.log(localStorage.getItem(i));
    }

};
*/

var clearIList = function(){
    var now = 1 ;
    while(localStorage.getItem(now)!=null){

        localStorage.setItem(now, null);
        now++;
    }

    localStorage.setItem("i", 1);
};

var clearList = function(){

    var position = document.getElementById('taskTable').firstChild.nextSibling;
    while(position.nextSibling!=null){
        position.nextSibling.remove(this);



    }

};




var printArray = function(array){
    for (var a = 0; a<array.length;a++){
        console.log(array[a]);

}
};
});