var isBreakable = function(elem, limit) {
  if (elem.offsetTop + elem.clientHeight > limit) {
    return true;
  }
}

var breakElem = function(elem) {
  for (i=0; i < elem.length; i++) {
    if (isBreakable(elem[i], 1850)) {
      if (elem[i].querySelectorAll('img').length) {
        breakImage(elem[i], i); // IMAGEN
      } else if (elem[i].querySelectorAll('.style-table').length) {
        breakTable(elem[i], i); // TEXTO
      } else {
        breakText(elem[i], i); // TEXTO
      }
      break;
    }
  }
}

var breakImage = function(elem, rowIndex) {
  // TODO Escribir una función que reduzca la imagen si está cerca del borde de la página.
  var origPage = elem.parentNode.parentNode;
  var header = origPage.getElementsByClassName('row')[0]  

  var newPage = origPage.cloneNode();
  var newContainer = document.createElement('div');
  newContainer.classList.add('container');
  newContainer.appendChild(header.cloneNode(true));

  var rowsBreakables = document.getElementsByClassName('breakable')[0].children;
  var l = rowsBreakables.length;
  for(var i=rowIndex; i < l; i++) {
    newContainer.appendChild(rowsBreakables[rowIndex])
  }

  newPage.appendChild(newContainer)

  origPage.after(newPage);

  document.getElementsByClassName('breakable')[0].classList.remove('breakable');
  newContainer.classList.add('breakable');

  breakElem(newContainer.children);
}

var breakTable = function(elem, rowIndex) {
  var contentBreakable = elem.querySelectorAll('tr');
  var piePagina = elem.querySelector('.pie_pagina');
  console.log(piePagina);

  for (var i=0; i < contentBreakable.length; i++) {
    if (contentBreakable[i].parentNode.tagName == 'THEAD') {
      tableHeader = contentBreakable[i].parentNode
    }
    if (isBreakable(contentBreakable[i], 1850 - elem.offsetTop - 42)) {
      var contentIndex = i;
      break;
    }
  }

  var newContent = document.createElement('div');
  newContent.classList.add('content');
  newContent.classList.add('style-table');

  var newTable = document.createElement('table');
  newTable.appendChild(tableHeader.cloneNode(true))

  var newTableBody = document.createElement('tbody')

  if (contentIndex) { // SI no pongo este if añade el header al tbody si el header coincide son el salto de página
    for (var i=contentIndex; i < contentBreakable.length; i++) {
      console.log(contentBreakable[contentIndex])
      newTableBody.appendChild(contentBreakable[i]);
    }
  } else {
    elem.innerHTML = '';
  }

  newTable.appendChild(newTableBody);
  newContent.appendChild(newTable);
  if (piePagina) {
    newContent.appendChild(piePagina);
  }

  var origPage = elem.parentNode.parentNode;
  var header = origPage.getElementsByClassName('row')[0]  

  var newPage = origPage.cloneNode();
  var newContainer = document.createElement('div');
  newContainer.classList.add('container');
  newContainer.appendChild(header.cloneNode(true));

  var newRow = document.createElement('div');
  newRow.classList.add('row');

  newRow.appendChild(newContent);
  newContainer.appendChild(newRow)

  var rowsBreakables = document.getElementsByClassName('breakable')[0].children;
  var l = rowsBreakables.length;
  for(var i=rowIndex + 1; i < l; i++) {
    newContainer.appendChild(rowsBreakables[rowIndex + 1])
  }


  newPage.appendChild(newContainer)

  origPage.after(newPage);

  document.getElementsByClassName('breakable')[0].classList.remove('breakable');
  newContainer.classList.add('breakable');

  breakElem(newContainer.children);
}

var breakText = function(elem, rowIndex) {
  var contentBreakable = elem.children;

  for (var i=0; i < contentBreakable.length; i++) {
    if (isBreakable(contentBreakable[i], 1850)) {
      var contentIndex = i;
      break;
    }
  }

  var elemBreakable = contentBreakable[contentIndex].children;

  // LOCALIZAR EL PARRAFO DONDE SE PRODUCE EL CORTE DE PÁGINA

  for (var i=0; i < elemBreakable.length; i++) {
    if (isBreakable(elemBreakable[i], 1850)) {
      var elemToBreak = elemBreakable[i];
      var elemIndex = i;
      break;
    } else if (i == elemBreakable.length - 1) {
    }
  }

  // SI todo EL PARRAFO ESTÁ POR DEBAJO DE LA LÍNEA de CORTE AÑADIR 
  // todo AL NUEVO PARRAFO, SINO SEPARAR EL PARRAFO EN PALABRAS
  // SI todo el parrafo está por encima de la línea de corte no hacer nada
  //
  if (elemToBreak) {
    var newElem = document.createElement(elemToBreak.tagName);

    if (elemToBreak.offsetTop + 36 > 1850) {
      newElem.innerHTML = elemToBreak.innerHTML; 
      // TODO es un poco cutre dejar el elemento. Mirar de poder borrarlo
      elemToBreak.innerHTML = '';
    } else {
      var parrafo = elemToBreak.innerHTML.split(' ');
      elemToBreak.innerHTML = parrafo[0];

      // LOCALIZAR LA PALABRA DONDE SE CORTA Y DIVIDIR EL PARRAFO EN ESA PARTE

      for (var i=1; i < parrafo.length; i++) {
        elemToBreak.innerHTML += ' ' + parrafo[i];
        if (isBreakable(elemToBreak, 1850)) {
          palabra = i;
          break;
        }
      }
      
      elemToBreak.innerHTML = parrafo.slice(0, palabra).join(' ');

      newElem.innerHTML = parrafo.slice(palabra).join(' ');
    }
  }

  var newContent = document.createElement('div');
  newContent.classList.add('content');

  // Si todo el parrafo está por encima de la línea de corte, es decir, 
  // si elemToBreak no existe no hacer nada, sino añadir el nuevo elemento.
  //
  if (elemToBreak) {
    newContent.appendChild(newElem);
  }

  var l = elemBreakable.length;
  for (var i=elemIndex + 1; i < l; i++) {
    newContent.appendChild(elemBreakable[elemIndex + 1]);
  }

  var row = elemBreakable[0].parentNode.parentNode;

  var origPage = row.parentNode.parentNode;
  var header = origPage.getElementsByClassName('row')[0]  

  var newPage = origPage.cloneNode();
  var newContainer = document.createElement('div');
  newContainer.classList.add('container');
  newContainer.appendChild(header.cloneNode(true));

  var newRow = document.createElement('div');
  newRow.classList.add('row');

  newRow.appendChild(newContent);
  newContainer.appendChild(newRow)

  var rowsBreakables = document.getElementsByClassName('breakable')[0].children;
  var l = rowsBreakables.length;
  for(var i=rowIndex + 1; i < l; i++) {
    newContainer.appendChild(rowsBreakables[rowIndex + 1])
  }


  newPage.appendChild(newContainer)

  origPage.after(newPage);

  document.getElementsByClassName('breakable')[0].classList.remove('breakable');
  newContainer.classList.add('breakable');

  breakElem(newContainer.children);
}

var rowsBreakables = document.getElementsByClassName('breakable')[0].children;
breakElem(rowsBreakables);
