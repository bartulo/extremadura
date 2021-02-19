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
      page_number.innerHTML = i + 2;

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
