

function montarPagina(obj){
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let trHead = document.createElement("tr");
    let thTitulo = document.createElement("th");
    thTitulo.innerHTML = "Titulo";
    let thComp = document.createElement("th");
    thComp.innerHTML = "Completed";
    trHead.appendChild(thTitulo);
    trHead.appendChild(thComp);
    thead.appendChild(trHead);
    table.appendChild(thead);
    let tbody = document.createElement("tbody");
    obj.forEach(forecast => {
        let trBody = document.createElement("tr");
        let tdTitulo = document.createElement("td");
        let tdComp = document.createElement("td");
        tdTitulo.innerHTML = forecast.data_3h.time;
        tdComp.innerHTML = forecast.data.swell_significantheight;
        trBody.appendChild(tdTitulo);
        trBody.appendChild(tdComp);
        tbody.appendChild(trBody)
    });
    table.appendChild(tbody);
    document.body.appendChild(table);
}

function teste3(){
    fetch("https://my.meteoblue.com/packages/sea-3h?apikey=9OKc5M2joNPv7Jit&lat=-23.9608&lon=-46.3336&asl=12&format=json")
        .then(resp => resp.json())
        .then(obj => montarPagina(obj))
}