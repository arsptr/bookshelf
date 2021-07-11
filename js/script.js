document.addEventListener("DOMContentLoaded", function () {
  const submitBook = document.getElementById("inputBook");

  submitBook.addEventListener("submit", function (event) {
    event.preventDefault();

    addBook();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const submitBook = document.getElementById("inputBook");

  submitBook.addEventListener("submit", function (event) {
    event.preventDefault();

    addingBook();
  });

  if (isStorageExist()) {
    loadDataStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data saved!");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});

document.addEventListener("click", function () {
  const search = document.getElementById("searchBook");
  search.addEventListener("click", function (e) {
    e.preventDefault();
  });
  searchBook();
});
