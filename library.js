const myLibrary = [];
const body = document.querySelector("body");
const section = document.querySelector("section");
const emptyPlaceholder = document.createElement("h1");
const addButton = document.querySelector(".addBook");
const createBook = document.querySelector(".createBook");
const fieldset = document.querySelector("fieldset");
const form = document.querySelector('form');

section.style.display = `block`;
emptyPlaceholder.textContent = `Your library is empty :( \n Please add books!`
emptyPlaceholder.classList.add('empty');
section.appendChild(emptyPlaceholder);

console.log("Too lazy to finish css so here you go.")




function Book(title, author, num_page, read_status) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.num_page = num_page;
    this.read_status = read_status;
    this.book_id = crypto.randomUUID();
}

// Book.prototype.updateRead = function () {
//     console.log(`function for updating read checkbox`)
// }

function addBookToLibrary(title, author, num_page, read_status) {
    const newBook = new Book(title, author, num_page, read_status);
    myLibrary.push(newBook);
    showBooks();
}

function buildCard(book) {
    const card = document.createElement("div");
    card.classList.add(`card`);
    section.appendChild(card);

    const removeButton = document.createElement(`button`);
    removeButton.classList.add('removeButton');
    removeButton.textContent = 'delete';
    card.appendChild(removeButton);

    removeButton.addEventListener("click", () => {
        deleteBook(book.book_id);
    });


    for (const key in book) { //ACCESS THE PROPERTIES OF OBJECT

        const cell = document.createElement("label");
        cell.classList.add(`col-1`)

        key === `title` ? cell.textContent = `Title: ` :
            key === `author` ? cell.textContent = `Author: ` :
                key === `num_page` ? cell.textContent = `# Pages: ` :
                    key === `read_status` ? cell.textContent = `Read: ` : cell.textContent = `ID: `;

        card.appendChild(cell);

        if (key === `read_status`) {
            const output = document.createElement("input");
            output.type = `checkbox`;
            output.classList.add(`col-2`);
            output.checked = book[key];

            output.addEventListener("change", () => {
                book.read_status = output.checked;
                // console.log(`Book "${book.title}" read status updated to:`, book.read_status);
            });

            card.appendChild(output);

        } else {
            const output = document.createElement("output");
            output.classList.add(`col-2`);
            // if(key === `read_status`){
            //     output
            // }
            output.value = book[key];
            card.appendChild(output);
        }
    }
}

function showBooks() {
    section.innerHTML = ""; // clear cards FIRST

    if (myLibrary.length === 0) {
        section.style.display = "block";
        emptyPlaceholder.style.display = "block";
        section.appendChild(emptyPlaceholder); // re-append it here
        return; // stop here, no cards to build
    }

    section.style.display = "grid";
    emptyPlaceholder.style.display = "none";

    for (const book of myLibrary) {
        buildCard(book);
    }
}


addButton.addEventListener("click", () => fieldset.style.display = `block`);


form.addEventListener("submit", e => {
    e.preventDefault();
    console.log(e);

    const title = document.getElementById('title-input').value;
    const author = document.getElementById('author-input').value;
    const num_page = document.getElementById('page-input').value;
    const read_status = document.getElementById('read-status-input').checked;

    addBookToLibrary(title, author, num_page, read_status);

    form.reset();

    fieldset.style.display = 'none';
});

function deleteBook(id) {
    const index = myLibrary.findIndex(book => book.book_id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        showBooks();
    }
}




// addBookToLibrary(`R.W. Chambers`, `King in Yellow`, `100`, `Not read`);
// addBookToLibrary(`Lovecraft`, `Cthulhu Mythos`, `100`, `Read`);








// console.log(myLibrary);
