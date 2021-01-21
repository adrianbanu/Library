let myLibrary = [];

function Book(author, title, pages, status) {
  this.authorBook = author;
  this.titleBook = title;
  this.pages = pages;
  this.status = status;
}

Book.prototype.changeStatus = function(){
  if(this.status == "Read"){
    this.status = "Not read";
  }else{
    this.status = "Read";
  }
}

document.getElementById("addBook").addEventListener("click", addBook);
document.getElementById("showForm").addEventListener("click", showForm);
document.getElementById("cancelBook").addEventListener("click", hideForm);

//add book to myLibrary
function addBookToLibrary(book){
  myLibrary.push(book); 
}

//retrieves information from the form and sends it to create the book
function addBook() {
  let title = document.getElementById("form-title").value;
  let author = document.getElementById("form-author").value;
  let pages = document.getElementById("form-pages").value;
  let status = document.getElementById("form-status").value;

  if(title.length > 0 && author.length > 0 && checkNumber(pages)){
    let carteNoua = new Book(author, title, pages, status);
    addBookToLibrary(carteNoua);
    formReset(); 
  }else{
    alert("Please enter correct information!");
  }

  render(myLibrary);
  bookNumber();
  saveLibrarytoLocal();
}

//check if number contains numbers only - or just space
function checkNumber(number){
  let noNumber = /[^0-9]/g;
  if(number.match(noNumber)){
    return false;
  }else{
    return true;
  }
}

//reset book form
function formReset(){
  document.getElementById("book-form").reset();
}

//show form when pressing NEW BOOK
function showForm(){
  document.getElementById("book-form").style.display = "block";
}

//hide form 
function hideForm(){
  document.getElementById("book-form").style.display = "none";
}

//for each book in myLibrary adds a new row in library
function render(myLibrary){
 clearLibrary();

 let i;
 let len = myLibrary.length;

 for(i = 0; i < len; i++){
  let table = document.getElementById("library-books");
  let row = table.insertRow(-1);
  row.id = `book-${i}`;
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);
  cell1.innerHTML = myLibrary[i].authorBook;
  cell2.innerHTML = myLibrary[i].titleBook;
  cell3.innerHTML = myLibrary[i].pages;
  let statusButton = document.createElement("button");
  statusButton.setAttribute("onclick", `readStatus(${i})`);
  statusButton.innerHTML = myLibrary[i].status;
  statusButton.id = `button-${i}`;
  statusButton.classList.add("button-status");
  cell4.append(statusButton);
  let deleteButton = document.createElement("button");
  deleteButton.setAttribute("onclick", `deleteBook(${i})`);
  deleteButton.innerHTML = "Delete";
  deleteButton.classList.add("button-delete");
  cell5.append(deleteButton);
 }
}

//deletes all book in library
function clearLibrary(){
  let list = document.getElementById("library-books");
  while (list.hasChildNodes()) {  
    list.removeChild(list.firstChild);
  }
}

/* change status from array and DOM*/
function readStatus(i){
  myLibrary[i].changeStatus();
  let changeRead = document.getElementById(`button-${i}`);
  changeRead.innerHTML = myLibrary[i].status;
  saveLibrarytoLocal();
}

/* removes the element from array and DOM*/
function deleteBook(i){
  myLibrary.splice(i,1);
  let item = document.getElementById(`book-${i}`);
  item.parentNode.removeChild(item);
  bookNumber();
  render(myLibrary);
  saveLibrarytoLocal();
}

//number of books in myLibrary
function bookNumber(){
  let books = document.getElementById("bookNumber");
  books.innerHTML = "Number of books: " + myLibrary.length;
}

//saves the books from myLibrary to localStorage
function saveLibrarytoLocal(){
  let len = myLibrary.length;
  let i;
  localStorage.setItem('booksNumber', len);
  
  for(i = 0; i < len; i++){
    localStorage.setItem(`author${i}`, myLibrary[i].authorBook);
    localStorage.setItem(`title${i}`, myLibrary[i].titleBook);
    localStorage.setItem(`pages${i}`, myLibrary[i].pages);
    localStorage.setItem(`status${i}`, myLibrary[i].status);
  }
}

//populates myLibrary from localStorage
function loadFromLocalStorage(){
  let i;
  let len = localStorage.getItem('booksNumber');

  for(i = 0; i < len; i++){ //in case localStorage is empty, len = null. Note null >= 0 is considered true!
    let author = localStorage.getItem(`author${i}`);
    let title = localStorage.getItem(`title${i}`);
    let pages = localStorage.getItem(`pages${i}`);
    let status = localStorage.getItem(`status${i}`);
    let carteNoua = new Book(author, title, pages, status);
    addBookToLibrary(carteNoua);
  }
}

document.body.addEventListener("load", loadFromLocalStorage());
document.body.addEventListener("load", render(myLibrary));
document.body.addEventListener("load", bookNumber());