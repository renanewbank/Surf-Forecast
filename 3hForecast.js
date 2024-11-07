function tabela3h(obj) {

    let latitude = document.querySelector('#span-latitude');
    latitude.innerHTML = obj.metadata.latitude + " graus";

    let longitude = document.querySelector('#span-longitude');
    longitude.innerHTML = obj.metadata.longitude + " graus";
    
    let table = document.createElement("table");
    table.id = "forecastTable"; 
    let thead = document.createElement("thead");
    let trHead = document.createElement("tr");
  
    let thDay = document.createElement("th");
    thDay.innerHTML = "Data";
      
    let thHour = document.createElement("th");
    thHour.innerHTML = "Hora";

    let thHeight = document.createElement("th");
    thHeight.innerHTML = "Altura da Onda (m)";

    let thPeriod = document.createElement("th");
    thPeriod.innerHTML = "Período (s)";

    let thWindSpeed = document.createElement("th");
    thWindSpeed.innerHTML = "Velocidade do Vento (m/s)";

    let thWindDirection = document.createElement("th");
    thWindDirection.innerHTML = "Direção do Vento (graus)";

    let thTemp = document.createElement("th");
    thTemp.innerHTML = "Temperatura da Água (ºC)";
    
    let thPrecip = document.createElement("th");
    thPrecip.innerHTML = "Possibilidade de Chuva (%)";

    trHead.appendChild(thDay);
    trHead.appendChild(thHour);
    trHead.appendChild(thHeight);
    trHead.appendChild(thPeriod);
    trHead.appendChild(thWindSpeed);
    trHead.appendChild(thWindDirection);
    trHead.appendChild(thTemp);
    trHead.appendChild(thPrecip);
    thead.appendChild(trHead);
    table.appendChild(thead);

    let tbody = document.createElement("tbody");
    
    obj.data_3h.time.forEach((date, index) => {
        let trBody = document.createElement("tr");
        let tdDate = document.createElement("td");
        let tdHour = document.createElement("td");
        let tdHeight = document.createElement("td");
        let tdPeriod = document.createElement("td");
        let tdWindSpeed = document.createElement("td");
        let tdWindDirection = document.createElement("td");
        let tdTemp = document.createElement("td");
        let tdPrecip = document.createElement("td");

        tdDate.classList.add("day");

        let hourSplit = date.split(' ');
        
        let dateSplit = hourSplit[0].split('-')

        tdDate.innerHTML = dateSplit[2] + "/" + dateSplit[1];
        tdHour.innerHTML = hourSplit[1];
        tdHeight.innerHTML = obj.data_3h.surfwave_height[index];
        tdPeriod.innerHTML = obj.data_3h.swell_meanperiod[index];
        tdWindSpeed.innerHTML = obj.data_3h.windspeed[index];
        tdWindDirection.innerHTML = obj.data_3h.winddirection[index];
        tdTemp.innerHTML = obj.data_3h.seasurfacetemperature[index];
        tdPrecip.innerHTML = obj.data_3h.precipitation_probability[index];

        trBody.appendChild(tdDate);
        trBody.appendChild(tdHour);
        trBody.appendChild(tdHeight);
        trBody.appendChild(tdPeriod);
        trBody.appendChild(tdWindSpeed);
        trBody.appendChild(tdWindDirection);
        trBody.appendChild(tdTemp);
        trBody.appendChild(tdPrecip);
        tbody.appendChild(trBody);
    });
    
    table.appendChild(tbody);
    document.body.appendChild(table);
}

function forecast() {
    fetch("https://my.meteoblue.com/packages/basic-3h_sea-3h?apikey=9OKc5M2joNPv7Jit&lat=-23.9608&lon=-46.3336&asl=12&format=json")
    .then((response) => response.json())
    .then((obj) => tabela3h(obj))
}

function tableAdd() {
    let buttonSemanal = document.querySelector("#btn3h");

    buttonSemanal.addEventListener("click", () => {
       
        let table = document.querySelector("#forecastTable");

        if (table) {
            table.remove();
            buttonSemanal.innerHTML = "Ver Previsão";
            buttonSemanal.classList.remove("button-voltar");
        } else {
            forecast();
            buttonSemanal.innerHTML = "Voltar";
            buttonSemanal.classList.add("button-voltar");
        }
    });
}

window.onload = tableAdd;
