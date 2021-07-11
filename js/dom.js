const UNCOMPLETED_BOOK_LIST_ID = "incompleteBookshelfList";
const COMPLETED_BOOK_LIST_ID = "completeBookshelfList";
const BOOK_ITEM_ID = "bookId";
const BOOKCHECKED = "inputBookIsComplete";

function addBook() {
  const uncompletedBook = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);
  const completedBook = document.getElementById(COMPLETED_BOOK_LIST_ID);
  const bookInputCompleted = document.getElementById(BOOKCHECKED).checked;

  const textTitle = document.getElementById("inputBookTitle").value;
  const textAuthor = document.getElementById("inputBookAuthor").value;
  const textYear = document.getElementById("inputBookYear").value;

  const book = addingBook(textTitle, textAuthor, textYear, false);
  const bookObject = composeBookObject(textTitle, textAuthor, textYear, false);
  const isCompleted = document.getElementById("completeBookshelfList");
  book[BOOK_ITEM_ID] = bookObject.id;
  books.push(bookObject);

  if (bookInputCompleted == true) {
    completedBook.append(book);
  } else if (bookInputCompleted == false) {
    uncompletedBook.append(book);
  } else if (isCompleted == true) {
    completedBook.append(book);
  } else {
    uncompletedBook.append(book);
  }
  updateDataToStorage();
}

function addingBook(bookTitle, bookAuthor, bookYear, isCompleted) {
  const textTitle = document.createElement("h3");
  textTitle.classList.add("book-title");
  textTitle.innerHTML = bookTitle;

  const textAuthor = document.createElement("p");
  textAuthor.classList.add("book-author");
  textAuthor.innerHTML = bookAuthor;

  const textYear = document.createElement("p");
  textYear.classList.add("book-year");
  textYear.innerHTML = bookYear;

  const textContainer = document.createElement("article");
  textContainer.classList.add("book_item");
  textContainer.append(textTitle, textAuthor, textYear);

  const container = document.createElement("div");
  container.classList.add("action");

  textContainer.append(container);

  if (isCompleted) {
    container.append(createUndoButton(), createDelButton());
  } else {
    container.append(createDoneButton(), createDelButton());
  }

  return textContainer;
}

function createButton(buttonTypeClass, eventListener, type) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.innerText = type; //menambahkan parameter baru, yg diisi innertext untuk tombol
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function addBookToCompleted(bookElement) {
  const listBookCompleted = document.getElementById(COMPLETED_BOOK_LIST_ID);
  const bookTitle = bookElement.querySelector(".book-title").innerText;
  const bookAuthor = bookElement.querySelector(".book-author").innerText;
  const bookYear = bookElement.querySelector(".book-year").innerText;

  const newBook = addingBook(bookTitle, bookAuthor, bookYear, true);
  const book = findBook(bookElement[BOOK_ITEM_ID]);
  book.isCompleted = true;
  newBook[BOOK_ITEM_ID] = book.id;

  listBookCompleted.append(newBook);

  bookElement.remove();
  updateDataToStorage();
}

function removeBookFromCompleted(bookElement) {
  alert("Do you want to remove this book?");

  const bookPosition = findBookIndex(bookElement[BOOK_ITEM_ID]);
  books.splice(bookPosition, 1);

  bookElement.remove();
  updateDataToStorage();
}

function undoBookFromCompleted(bookElement) {
  const listUncompletedBook = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);
  const bookTitle = bookElement.querySelector(".book-title").innerText;
  const bookAuthor = bookElement.querySelector(".book-author").innerText;
  const bookYear = bookElement.querySelector(".book-year").innerText;

  const newBook = addingBook(bookTitle, bookAuthor, bookYear, false);

  const book = findBook(bookElement[BOOK_ITEM_ID]);
  book.isCompleted = false;
  book.bookCompleted = false;
  newBook[BOOK_ITEM_ID] = book.id;

  listUncompletedBook.append(newBook);

  bookElement.remove();
  updateDataToStorage();
}

function createDoneButton() {
  return createButton(
    "teal",
    function (event) {
      addBookToCompleted(event.target.parentElement.parentElement);
    },
    "Done"
  );
}

function createDelButton() {
  return createButton(
    "softRed",
    function (event) {
      removeBookFromCompleted(event.target.parentElement.parentElement);
    },
    "Delete"
  );
}

function createUndoButton() {
  return createButton(
    "softViolet",
    function (event) {
      undoBookFromCompleted(event.target.parentElement.parentElement);
    },
    "Unread"
  );
}

function searchBook() {
  const searchBooks = document
    .getElementById("searchBookTitle")
    .value.toLowerCase();
  let bookItems = document.querySelectorAll("article");

  bookItems.forEach((book) => {
    const inputBook = book.firstChild.textContent.toLowerCase();

    if (inputBook.indexOf(searchBooks) != -1) {
      book.style.display = "block";
    } else {
      book.style.display = "none";
    }
  });
}
