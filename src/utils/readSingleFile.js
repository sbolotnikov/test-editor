
function readSingleFile(evt) {
    var f = evt.target.files[0]; 
    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
          // var contents = e.target.result;
        // alert( "Got the file.\n" 
        //       +"name: " + f.name + "\n"
        //       +"type: " + f.type + "\n"
        //       +"size: " + f.size + " bytes\n"
        //       + "starts with: " + contents.substr(1, contents.indexOf("\n"))
        // );  
        // document.getElementById('area').value=  contents;
        return JSON.parse(e.target.result);
      }
      r.readAsText(f);

    } else { 
      return null;
    }
  }

export default readSingleFile