const currency_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

/*for(code in countryList){
    console.log(code, countryList[code]);
}*/

// for country name

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;

        /* fix USD for FROM and INR for TO at first take*/

        if(select.name==="From" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="To" && currCode==="INR"){
            newOption.selected="selected";
        }

        select.append(newOption);

        // when new country get selected

        select.addEventListener("change", (evt/*event object*/)=>{
            updateFlag(evt.target);
        });
    }
}

// for country flag

const updateFlag = (element)=>{
    //console.log(element);

    let currCode = element.value;
    //console.log(currCode);

    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    // select ke parent pr jaenge => select-currency
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
}

// exchange rate

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const result = document.querySelector(".result");

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault(); // no loading now 

    // access entered amount

    let amount = document.querySelector(".amount input");
    let amountVal=amount.value;
    //console.log(amountVal);

    if(amountVal==="" || amountVal<1){
        amountVal=1;
        amount.value="1";
    }

    //console.log(fromCurr.value , toCurr.value);

    const URL = `${currency_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    //console.log(rate);

    let finalAmount = amountVal * rate;

    // result => 1 USD = 83 INR
    result.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    result.style.fontSize="0.815rem";
    result.style.fontFamily="Verdana, Geneva, Tahoma, sans-serif"; 
});