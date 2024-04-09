let books = [
    {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        year: 1925,
        isComplete: false,
    },
    {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        year: 1960,
        isComplete: false,
    },
    {
        id: 3,
        title: '1984',
        author: 'George Orwell',
        year: 1949,
        isComplete: true,
    },
    {
        id: 4,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        year: 1813,
        isComplete: true,
    },
];

// Fungsi untuk menampilkan buku
function renderBooks() {
    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    const completeBookshelfList = document.getElementById('completeBookshelfList');

    incompleteBookshelfList.innerHTML = '';
    completeBookshelfList.innerHTML = '';

    for (const book of books) {
        const bookElement = document.createElement('article');
        bookElement.classList.add('book_item');
        const bookInfo = `
      <h3>${book.title}</h3>
      <p>Penulis: ${book.author}</p>
      <p>Tahun: ${book.year}</p>
    `;

        const actionElement = document.createElement('div');
        actionElement.classList.add('action');

        if (book.isComplete) {
            actionElement.innerHTML = `
        <button class="green" onclick="toggleReadStatus(${book.id})">Belum selesai di Baca</button>
        <button class="red" onclick="removeBook(${book.id})">Hapus buku</button>
      `;
            bookElement.innerHTML = bookInfo;
            bookElement.appendChild(actionElement);
            completeBookshelfList.appendChild(bookElement);
        } else {
            actionElement.innerHTML = `
        <button class="green" onclick="toggleReadStatus(${book.id})">Selesai dibaca</button>
        <button class="red" onclick="removeBook(${book.id})">Hapus buku</button>
      `;
            bookElement.innerHTML = bookInfo;
            bookElement.appendChild(actionElement);
            incompleteBookshelfList.appendChild(bookElement);
        }
    }
}

// Fungsi untuk menambahkan buku baru
document.getElementById('inputBookForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const isComplete = document.getElementById('inputBookIsComplete').checked;
    const newBook = {
        id: Date.now(),
        title,
        author,
        year,
        isComplete,
    };
    books.push(newBook);
    renderBooks();
    document.getElementById('inputBookForm').reset();
});

// Fungsi untuk mencari buku
document.getElementById('searchBookForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchTitle = document.getElementById('searchBookTitle').value.toLowerCase();
    const searchResult = books.filter(book => book.title.toLowerCase().includes(searchTitle));
    renderSearchResult(searchResult);
});

// Fungsi untuk menampilkan hasil pencarian
function renderSearchResult(result) {
    const searchResultContainer = document.getElementById('incompleteBookshelfList');
    searchResultContainer.innerHTML = '';
    for (const book of result) {
        const bookElement = document.createElement('article');
        bookElement.classList.add('book_item');
        const bookInfo = `
      <h3>${book.title}</h3>
      <p>Penulis: ${book.author}</p>
      <p>Tahun: ${book.year}</p>
    `;
        bookElement.innerHTML = bookInfo;
        searchResultContainer.appendChild(bookElement);
    }
}

// Fungsi untuk menghapus buku
function removeBook(bookId) {
    books = books.filter(book => book.id !== bookId);
    renderBooks();
}

// Fungsi untuk mengubah status buku
function toggleReadStatus(bookId) {
    const bookIndex = books.findIndex(book => book.id === bookId);
    books[bookIndex].isComplete = !books[bookIndex].isComplete;
    renderBooks();
}

// Menampilkan daftar buku saat halaman dimuat
renderBooks();
