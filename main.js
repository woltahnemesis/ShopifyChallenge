//Nominated movie list
let nomi_list = []; 

// li array
let li = [];
let li_1 = [];

// button array
let btn = [];

// For loop variable
let c = 0;

// Elements
let h4 = document.createElement('h4');
let ul = document.createElement('ul');

//Label variable
let labelNomi;

// Gets executed when the button in the form is submitted
document.querySelector('form').addEventListener('submit', function (e){
    
    //Prevents the web from reloading
    e.preventDefault();
    
    // search variable
    let search;
    
    //Label
    let labelResult = 'Results for "';
    
    //Assigns the value of the search input to the search variable
    search = document.getElementById("search").value;
    
    //API url with search variable as the parameter
    let url = "http://www.omdbapi.com/?i=tt3896198&apikey=607198ce&s=" + search;
    
    //Makes a fetch request
    fetch(url).then(function (response){
        
        //Returns the response from JSON
        return response.json();
        
    // A function with JSON object as a parameter    
    }).then(function(obj){
        
        // Performs the statements inside when obj.Response is true
        if(obj.Response === "True"){
            
            //Display the div.result-box
            document.querySelector('.sub-container .result-box').style.display = 'block';
            
            //Resets the content of .result-box to nothing
            document.querySelector('.result-box').innerHTML = "";
            
            //Adds new content in .result-box
            document.querySelector('.result-box').innerHTML = '<h4>' + labelResult + search + '"</h4><ul></ul>';
            
            // Loops until i is greater than the length of the obj.Search
            for(let i = 0; i < obj.Search.length; i++){
                
                //Adds li element to the li array
                li[i] = document.createElement("li");
                
                //Assigns the movie name & year
                let name_year1 = obj.Search[i].Title + " (" + obj.Search[i].Year + ") ";
                
                //Assigns values to the li element
                li[i].innerHTML = obj.Search[i].Title + " (" + obj.Search[i].Year + ") " + "<button value='" + obj.Search[i].Title + " (" + obj.Search[i].Year + ") " + "' class='btn-nomi' >Nominate</button>";
                
                for(let a = 0; a < nomi_list.length; a++){
                    
                    //Checks if the name_year1 is in the nomi_list
                    if(nomi_list[a] == name_year1){

                         //Assigns values to the li element but the button is disabled
                        li[i].innerHTML = obj.Search[i].Title + " (" + obj.Search[i].Year + ") " + "<button value='" + obj.Search[i].Title + " (" + obj.Search[i].Year + ") " + "' class='btn-nomi' disabled>Nominate</button>";
                        
                    }
                    
                }
                
                //Inserts the li element in ul element (parent element)
                document.querySelector('.result-box ul').append(li[i]);
            }
            
            //Assigns all button.btn-nomi
            let btn_nominate = document.querySelectorAll('.btn-nomi');
            
            for(let b = 0; b < obj.Search.length; b++){
                
                //Gets executed when nominate button is clicked
                btn_nominate[b].addEventListener('click', function(e){
                    
                    //Makes the button disabled
                    e.target.disabled = true;
                    
                    let name_year2 = obj.Search[b].Title + " (" + obj.Search[b].Year + ") ";
                    
                    //Checks if button's value is the same as name_year2's value
                    if(e.target.value == name_year2){
                        
                        //Displays the nomination's div
                        document.querySelector('.sub-container .nomi-box').style.display = 'block';
                        
                        //Checks if label for nomination is present/true
                        if(!labelNomi){
                            labelNomi = 'Nominations';
                            h4.append(labelNomi);
                            document.querySelector('.nomi-box').append(h4);
                            document.querySelector('.nomi-box').append(ul);
                        }
                        
                        //Adds values to the array
                        nomi_list.push(obj.Search[b].Title + " (" + obj.Search[b].Year + ") ");
                        
                        //Adds an li element with a button
                        for(c; c < nomi_list.length; c++){
                            btn.push(document.createElement('button'));
                            btn[c].innerHTML = "Remove";
                            btn[c].setAttribute('class', 'btn-remove');
                            btn[c].setAttribute('value', name_year2);
                            li_1[c] = document.createElement('li');
                            li_1[c].append(nomi_list[c]);
                            li_1[c].append(btn[c]);
                            document.querySelector('.nomi-box ul').append(li_1[c]);
                        }
                        
                        //Selects all button.btn-remove
                        let btn_remove = document.querySelectorAll('.btn-remove');
            
                        //Checks the length of the array
                        if(btn_remove.length != 0){

                            for(let d = 0; d < nomi_list.length; d++){
                                
                                //Removes selected list when clicked
                                btn_remove[d].addEventListener('click', function(e){

                                    if(e.target.value == nomi_list[d]){
                                        
                                        nomi_list.splice(d, 1);
                                        
                                        li_1[d].parentNode.removeChild(li_1[d]);
                                        
                                    }
                               });
                            }
                        } else {
                            
                            //Writes an error message if btn_remove's length is equals to 0
                            console.log('No value!');
                        }
                
                    }
                    
                    
                });
            }
                
        } else {
            
            //Shows the error message when error occurs
            document.querySelector('.result-box').innerHTML = '<h4>' + labelResult + search + '"</h4>';
            document.querySelector('.result-box').append(obj.Error);
        }

    //Catches the error
    }).catch(function (error){
        console.error(error);
    });
    
});

