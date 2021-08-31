 //funzione che formatta la data per l'attributo min
 export function convertiData(date){
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    }
    date = yyyy+'-'+mm+'-'+dd;
    return date;
}

//funzione che restituisce l'orario a partire da una certa data
export function getOra(date){
    var ore = date.getHours();
    var minuti = date.getMinutes();
    if(ore<10){
        ore='0'+ore
    } 
    if(minuti<10){
        minuti='0'+minuti
    }
    var orario = ore+':'+minuti;
    return orario;
}

//funzione che verifica l'effettiva assenza di data nel corrispondente campo
export function emptyDate(date){
    if (date==0 || date=="Invalid Date"){
        return true;
    } else {
        return false;
    }
}