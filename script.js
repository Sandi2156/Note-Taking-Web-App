let textarea = document.getElementById('note')
let title = document.getElementById('title')
let add_btn = document.getElementById('add-btn')
let note_heading = document.getElementById('note-heading')
let note_show = document.getElementById('note-show')
let delete_btn = document.getElementById('delete-btn')
if(localStorage.getItem('notes') != null){
    show()
}

// add  notes section
add_btn.addEventListener('click', (e)=>{
    let note_array,title_array
    if(localStorage.getItem('notes') == null){
         note_array = []
    }
    else{
        note_array = JSON.parse(localStorage.getItem('notes'))
    }
    if(localStorage.getItem('titles') == null)
        title_array =[]
    else{
        title_array = JSON.parse(localStorage.getItem('titles'))
    }
    if(textarea.value != '' && title.value != ''){
        note_array.push(textarea.value)
        localStorage.setItem('notes', JSON.stringify(note_array) )
        title_array.push(title.value)
        localStorage.setItem('titles', JSON.stringify(title_array))
        textarea.value = ''
        title.value = ''
        show() 
    }
})

// display notes section
function show()
{
    let notes_container = document.getElementById('notes-container')
    let note_array = JSON.parse(localStorage.getItem('notes'))
    let title_array = JSON.parse(localStorage.getItem('titles'))
    let total ='';
    note_array.forEach((element,index) => {
        total += `<div class="card" id="card" style="width: 18rem;margin: 5px;">
        <div class="card-body">
          <h5 class="card-title" id="note-heading">`+title_array[index]+`</h5>
          <hr>
          <p class="card-text" id="note-show">${element}</p>
          <a id=${index} class="delete" onclick='delete_card(this.id)' class="btn btn-primary" id="delete-btn">Delete</a>
        </div>
      </div>`
    });

    notes_container.innerHTML = total;
}

// delete card section
function delete_card(index)
{
    let note_array = JSON.parse(localStorage.getItem('notes'))
    note_array.splice(index,1)
    localStorage.setItem('notes',JSON.stringify(note_array))
    let title_array = JSON.parse(localStorage.getItem('titles'))
    title_array.splice(index,1)
    localStorage.setItem('titles', JSON.stringify(title_array))
    show()
}

//search features

let search = document.getElementById('search-house')
search.addEventListener('input', ()=>{

    let value  = search.value.toLowerCase();
    let cards = document.getElementsByClassName('card')
    Array.from(cards).forEach((e)=>{
        let text = e.getElementsByTagName('p')[0].innerText.toLowerCase();
        if(text.includes(value))
            e.style.display = 'block'
        else
            e.style.display = 'none'
    })
})

