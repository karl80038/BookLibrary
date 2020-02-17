const form = document.querySelector('#book-form');
const bookName = document.querySelector('#bName');
const bookAuthor = document.querySelector('#bAuthor');
const library = document.querySelector('.collection');
const clearBtn = document.querySelector(".clear-tasks");
const addBtn = document.querySelector('.add-Book')

loadEventListeners();

function loadEventListeners() 
{
    //get tasks from local storage on load
    document.addEventListener('DOMContentLoaded', getBooks);
    addBtn.addEventListener('click', addBook);
    library.addEventListener('click', removeBook);
    clearBtn.addEventListener('click', clearLibrary);

}

function getBooks()
{
    let books;

    if(localStorage.getItem('books') === null)
    {
        books = [];
    }
    else 
    {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.forEach(Book => 
    {
        //for each task from tasks array - create an li element
        const li = document.createElement('li');
        //add class name to the li element
        li.className = 'collection-item';
        //create a text-node and append it to the li
        li.appendChild(document.createTextNode(Book.name));
        li.appendChild(document.createTextNode(Book.author));
        //Create an anchor tag
        const removeLink = document.createElement('a');
        //Add a class name to the removeLink element
        removeLink.className = 'delete-item secondary-content';
        removeLink.innerHTML = 'Remove';
        li.appendChild(removeLink);

        //add li element to the ul collection
        library.appendChild(li);
    });
}


function addBook(event)
{
    var Book = {
        name : bookName.value,
        author : bookAuthor.value

    }
    console.log(Book.name, Book.author);

    if (Book.name === '' | Book.author === '')
    {
        
        M.toast({html: "Please fill all the required fields", classes: 'red'});
        document.getElementById("bName").style.borderColor = "red";

    }
    else 
    {
        const li = document.createElement('li');
        //Assign a class name to the HTML element
        li.className = 'collection-item';
        //Add text content to the li element
        li.appendChild(document.createTextNode(Book.name));
        li.appendChild(document.createTextNode(Book.author));
        //Add li element to the ul collection
        library.appendChild(li);
        //Create an anchor tag
        const removeLink = document.createElement("a");
        
        //Add a class name to the removeLink element
        removeLink.className = 'delete-item secondary-content';
        removeLink.innerHTML = 'Remove';
        li.appendChild(removeLink);
    
        console.log(li);
    
        storeInLocalStorage(Book);
        // document.getElementById('#bName').value = '';
        // document.getElementById('#bAuthor').value = '';

        event.preventDefault();
    }

}

function storeInLocalStorage(book) 
{
    //Declare an array to read from local storage
    let books;
    if (localStorage.getItem('books') === null) 
    {
        books = [];
    }
    else 
    {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

}

function removeBook(event)
{
    if (event.target.classList.contains('delete-item'))
    {

        if (confirm('Are you sure you want to remove this book?'))
        {
            //Remove the entire li element
            event.target.parentElement.remove();

            //Remove from local storage
            removeFromLocalStorage(event.target.parentElement);    

        }


        console.log('remove element clicked');
    }
}

function clearLibrary()
{
    while(library.firstChild)
    {
        library.removeChild(library.firstChild);
    }

    clearBooksFromLocalStorage();

}

function clearBooksFromLocalStorage()
{
    localStorage.clear();
}

function removeFromLocalStorage(bookitem)
{
    let books;
    

    if(localStorage.getItem('books') === null) 
    {
        books = [];

    }
    else
    {
        books = JSON.parse(localStorage.getItem('books'));
    }
    localStorage.clear();

    // books.forEach(function (book, index) 
    //{
    //     console.log(book.name);
    //     console.log("hi");
    //     console.log(bookitem);
    //     console.log(bookitem);
    //     if (book.name === bookitem.textContent.slice(0, -1));
    //     {
    //         books.splice(index, 1);
    //     }
    // });
    
    // localStorage.setItem('books', JSON.stringify(books));

    // books.forEach(Book =>{
    //     console.log(Book);
    //     console.log(bookitem);
        
    // })
    books.forEach(function (book, index){
        console.log(book, "", index);
        storeInLocalStorage(book[index-1]);
        localStorage.setItem('books', JSON.stringify(books));

    })
 
}
//.textContent.slice(0, -1)