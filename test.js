cvar boolean = ""
productNames.filter((element) => {
       boolean =  element.toLowerCase() === searchValue.toLowerCase();
     });
 return boolean