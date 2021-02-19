var isBreakable = function(elem, limit) {
  if (elem.offsetTop + elem.clientHeight > limit) {
    return true;
  }
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
    console.log(elemBreakable[i].offsetTop + elemBreakable[i].clientHeight);
    if (isBreakable(elemBreakable[i], 1850)) {
      var elemToBreak = elemBreakable[i];
      var elemIndex = i;
      break;
    } else if (i == elemBreakable.length - 1) {
      console.log('Todo el parrafo por encima de la línea de corte');
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

  for (i=0; i < newContainer.children.length; i++) {
    console.log(newContainer.children[i].offsetTop + newContainer.children[i].clientHeight);
    if (isBreakable(newContainer.children[i], 1850)) { 
      breakText(newContainer.children[i], i);
      break;
    }
  }
}

var rowsBreakables = document.getElementsByClassName('breakable')[0].children;
for (i=0; i < rowsBreakables.length; i++) {
  if (isBreakable(rowsBreakables[i], 1850)) { 
    breakText(rowsBreakables[i], i);
    break;
  }
}
