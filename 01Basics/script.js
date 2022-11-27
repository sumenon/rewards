const fname = document.getElementById('fname')
const email = document.getElementById("email")
const password = document.getElementById("password")
const form = document.getElementById('signup')
const submit = document.getElementById('submit')
const errorElement = document.getElementById('error')
const url2 = "https://frontend-take-home.fetchrewards.com/form"
const formEL = document.querySelector('form')


formEL.addEventListener('submit', async (e) =>{
    const formData = new FormData(formEL);
    const formDataSerialized = Object.fromEntries(formData);
    console.log(formDataSerialized,"formDataSerialized info");
    const jsonObject = {
        ...formDataSerialized,
    };
    let messages = []
    // To Do - add validations for the fields   
    if (password.value.length <= 6){
        messages.push('Password must be longer than 6 characters')    
    }

    if (messages.length > 0) {
        e.preventDefault()
        console.log ("here again")
        errorElement.innerText = messages.join(', ')
        
    }
    else {
    try{
        e.preventDefault();
        const response =await fetch(url2, {
            method: 'POST',
            body: JSON.stringify(jsonObject),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log(json);
        document.getElementById('signup').reset();
        errorElement.innerText=""
        alert('Success!');

    } catch(e){
        console.error(e);
        alert('there was an error');

    }
}})


function getdropdownVals(){
let dropdown = document.getElementById('state');
dropdown.length = 0;
let defaultOption = document.createElement('option');
defaultOption.text = 'Select a State';

let occDropdown = document.getElementById('occupation');
occDropdown.length = 0;
let defaultOccOption = document.createElement('option')
defaultOccOption.text = "Select an Occupation "

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

occDropdown.add(defaultOccOption);
occDropdown.selectedIndex = 0;

const url = 'https://frontend-take-home.fetchrewards.com/form';
  
fetch(url)
    .then((response) =>{
    console.log ("121");
    return response.json();
    })
      .then((data) => {
        
        for (var i = 0; i < data.states.length; i++) {
          option = document.createElement('option');
      	  option.text = data.states[i].name;
      	  option.value = data.states[i].abbreviation;
      	  dropdown.add(option);
          
        }

        for (var i = 0; i < data.occupations.length; i++) {
            option = document.createElement('option');
            option.text = data.occupations[i];
            occDropdown.add(option);
            
          }
 
    })
      .catch(function(error) {
        console.log(error);
      });
  

     
  }


