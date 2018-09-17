(function() {

  "use strict" ;

  function ready() {
    var bodyChildren = document.body.childNodes;
    var pre = bodyChildren[0];
    if(pre.innerText) {
      pre.style.display = "none";

      var st = document.createElement('style');
          st.type = 'text/css';
          st.textContent = '@font-face { font-family: Roboto; src: url("'
                           + chrome.extension.getURL('vendor/Roboto-Regular.ttf')
                           + '"); }';
      document.head.appendChild(st);

      var csvContent = document.createElement('div') ;
          csvContent.id = 'csvContent';
      document.body.appendChild(csvContent);

      var data = Papa.parse(pre.innerText).data;
      var colHeaders = data.splice(0, 1)[0];

      for (var i = data.length; i--;) {
        if (data[i].length === 1) {
          data.splice(i, 1);
        }
      }

      var hot = new Handsontable(csvContent, {
        data: data,
        rowHeaders: true,
        colHeaders: colHeaders,
        columnSorting: true,
        manualColumnResize: true,
        sortIndicator: true,
        colWidths: 150,
      });
    }
  }

  document.addEventListener("DOMContentLoaded", ready, false);
})();