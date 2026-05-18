
//car
let carArr = [];

class Car {
    constructor(nome, preco, alturaCacamba, alturaVeiculo, alturaSolo, capacidadeCarga, motor, potencia, volumeCacamba, roda, image){
        this.nome = nome;
        this.preco = preco;
        this.alturaCacamba = alturaCacamba;
        this.alturaVeiculo = alturaVeiculo;
        this.alturaSolo = alturaSolo;
        this.capacidadeCarga = capacidadeCarga;
        this.motor = motor;
        this.potencia = potencia;
        this.volumeCacamba = volumeCacamba;
        this.roda = roda;
        this.image = image;
    }
} 

// search on array if exist carClass returning 1 if not return -1
function GetCarArrPosition(arr, carClass) {
    for(let i = 0; i < arr.length; i++){
        if(arr[i].nome  === carClass.nome)
            return i;
    }
    return -1;
}

function SetCarToCompare(el, carClass) {
    if(carClass instanceof Car){       
        if(el.checked){
            if(carArr.length >= 2) {
                alert("Você só pode comparar 2 carros por vez!");
                el.checked = false;
                return;
            }
            
    
            if(GetCarArrPosition(carArr, carClass) === -1){
                carArr.push(carClass);
            } 
        } 
        else {
            let index = GetCarArrPosition(carArr, carClass);
            if(index !== -1){
                carArr.splice(index, 1);
            }
        }
    }
    else {
        throw "Você precisa selecionar um carro válido.";
    }
}

function ShowCompare() {
    if(carArr.length < 2) {
        alert("É necessário escolher dois veículos para apresentar a comparação");
        return;
    }
    
    UpdateCompareTable();
    document.getElementById("compare").style.display = "block";
}

function HideCompare(){
    document.getElementById("compare").style.display = "none"; 
}

function UpdateCompareTable() {
    if(carArr.length === 2) {
        for(let i = 0; i < 2; i++) {
            let car = carArr[i];
            
            document.getElementById(`compare_image_${i}`).innerHTML = `
                <img src="${car.image}" alt="${car.nome}" style="width: 100%; max-width: 200px; height: auto; display: block; margin: 0 auto; border-radius: 4px;">
            `;
            
            document.getElementById(`compare_modelo_${i}`).innerText = car.nome;
            document.getElementById(`compare_alturacacamba_${i}`).innerText = car.alturaCacamba + " mm";
            document.getElementById(`compare_alturaveiculo_${i}`).innerText = car.alturaVeiculo + " mm";
            document.getElementById(`compare_alturasolo_${i}`).innerText = car.alturaSolo + " mm";
            document.getElementById(`compare_capacidadecarga_${i}`).innerText = car.capacidadeCarga + " Kg";
            document.getElementById(`compare_motor_${i}`).innerText = car.motor;
            document.getElementById(`compare_potencia_${i}`).innerText = car.potencia + " cv";
            document.getElementById(`compare_volumecacamba_${i}`).innerText = car.volumeCacamba + " L";
            document.getElementById(`compare_roda_${i}`).innerText = car.roda;
            
            document.getElementById(`compare_preco_${i}`).innerText = car.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
    }
}