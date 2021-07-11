const STORAGE_KEY = "BOOKSHELF";

let books = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Your browser not provide local storage");

    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);

  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) books = data;

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
  if (isStorageExist()) saveData();
}

function composeBookObject(bookTitle, bookAuthor, bookYear, isCompleted) {
  return {
    id: +new Date(),
    bookTitle,
    bookAuthor,
    bookYear,
    isCompleted,
  };
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;

    index++;
  }
  return -1;
}

function refreshDataFromBooks() {
  const listUncompletedBook = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);
  let listBookCompleted = document.getElementById(COMPLETED_BOOK_LIST_ID);

  for (book of books) {
    const newBook = addingBook(
      book.bookTitle,
      book.bookAuthor,
      book.bookYear,
      book.isCompleted
    );
    newBook[BOOK_ITEM_ID] = book.id;

    if (book.isCompleted) {
      listBookCompleted.append(newBook);
    } else {
      listUncompletedBook.append(newBook);
    }
  }
}
