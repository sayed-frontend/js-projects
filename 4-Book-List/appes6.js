class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.querySelector("#book-list");
    // create row element
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
    list.appendChild(row);
  }

  clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  showAlert(message, className) {
    // create div
    const div = document.createElement("div");
    // add class
    div.className = `alert ${className}`;
    // add text node
    div.appendChild(document.createTextNode(message));

    // add to parent
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    // insert before form
    container.insertBefore(div, form);

    // Set timout function (to hide the alert message after 3 seconds)
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
}

// local storage class
class Store {
  // getBooks
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  // displayBooks
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function(book) {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }
  // addBook
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  // removeBook
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Dom load event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// add event listener to submit form to add book
document.getElementById("book-form").addEventListener("submit", function(e) {
  e.preventDefault();
  // Get Form Values
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  // instantiate book
  const book = new Book(title, author, isbn);
  // instantiate ui
  const ui = new UI();

  // validate (to check the empty fields)
  if (title === "" || author === "" || isbn === "") {
    // show alert error
    ui.showAlert("Pleade fill in all fields", "error");
  } else {
    // add book to list
    ui.addBookToList(book);

    // add to localstorage
    Store.addBook(book);
    // show alert success
    ui.showAlert("Book Added!", "success");
    // clear fields value
    ui.clearFields();
  }
});

// add event listener to delete button
document.querySelector("#book-list").addEventListener("click", function(e) {
  // instantiate ui
  const ui = new UI();
  // delete book from ui
  ui.deleteBook(e.target);
  // remove book form localstorage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert("Book Deleted", "success");
});
