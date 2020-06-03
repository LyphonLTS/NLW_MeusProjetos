function populateUFs() {
    const UFselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then(res => res.json() )
        .then(states => {
            for(const state of states){
                UFselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const CitySelect = document.querySelector("select[name=city]")
    const StateInput = document.querySelector("input[name=state]")

    const UFvalue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    StateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UFvalue}/municipios`

    fetch(url)
        .then(res => res.json() )
        .then(cities => {
            for(const city of cities){
                CitySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }

            CitySelect.disabled = false
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)