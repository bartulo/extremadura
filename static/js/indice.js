var pages = document.getElementsByTagName('page');

var index_page = pages[0].cloneNode();
var index_container = document.createElement('div');
index_container.classList.add('container');
var index_row = document.createElement('div');
index_row.classList.add('row');
var index_content = document.createElement('div');
index_content.classList.add('content');
index_content.classList.add('index');

var titulo = document.createElement('h1');
titulo.innerHTML = 'Índice';
index_content.appendChild(titulo);

for (i=0; i < pages.length; i++) {
  var hs = pages[i].querySelectorAll('h1, h2, h3');
  for (n=0; n < hs.length; n++) {
    if (hs[n].innerHTML) {
      var chapter = document.createElement('div');
      chapter.classList.add('chapter');
      chapter.innerHTML = hs[n].innerHTML;

      var dots = document.createElement('div');
      dots.classList.add('dots');

      var page_number = document.createElement('div');
      page_number.classList.add('page_number');
      page_number.innerHTML = i + 3;

      var chapter_container = document.createElement('div');
      chapter_container.classList.add('index_row');
      if (hs[n].tagName == 'H2' ) {
        chapter_container.classList.add('second_level')
      } else if (hs[n].tagName == 'H3') {
        chapter_container.classList.add('third_level')
      }

      chapter_container.appendChild(chapter);
      chapter_container.appendChild(dots);
      chapter_container.appendChild(page_number);
      
      index_content.appendChild(chapter_container);
    }
  }
}

var header = pages[0].getElementsByClassName('row')[0];

index_row.appendChild(index_content);
index_container.appendChild(header.cloneNode(true));
index_container.appendChild(index_row);
index_page.appendChild(index_container);

pages[0].before(index_page);

index_rows = pages[0].querySelectorAll('.index_row');
for (let i = 0; i < index_rows.length; i++) {
  if (index_rows[i].offsetTop > 1806) {
    index_to_break = i;
    break;
  }
};

var index_page = pages[0].cloneNode();
var index_container = document.createElement('div');
index_container.classList.add('container');
var index_row = document.createElement('div');
index_row.classList.add('row');
var index_content = document.createElement('div');
index_content.classList.add('content');
index_content.classList.add('index');

index_container.appendChild(header.cloneNode(true));

l = index_rows.length;
for (let i = index_to_break + 1; i < l + 1; i++) {
  index_content.appendChild(pages[0].querySelector('.content.index').children[index_to_break + 1])
  console.log(index_rows.length)
};

index_row.appendChild(index_content);
console.log(index_row);
index_container.appendChild(index_row);
index_page.appendChild(index_container);

pages[0].after(index_page);
