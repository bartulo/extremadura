function romanize (num) {
    if (!+num)
        return false;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

var pages = document.querySelectorAll('[type="anexo"]');

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
      page_number.innerHTML = romanize(i + 1);

      var chapter_container = document.createElement('div');
      chapter_container.classList.add('index_row');
      if (hs[n].tagName == 'H2' ) {
        chapter_container.classList.add('second_level')
        chapter.innerHTML = hs[n].previousElementSibling.innerHTML + ' ' + chapter.innerHTML;
      } else if (hs[n].tagName == 'H3') {
        chapter_container.classList.add('third_level')
      }

      chapter_container.appendChild(chapter);
      chapter_container.appendChild(dots);
      chapter_container.appendChild(page_number);
      
      var index_pages = document.getElementsByClassName('index')
      var index_content = index_pages[index_pages.length - 1];
      index_content.appendChild(chapter_container);
    }
  }
}
