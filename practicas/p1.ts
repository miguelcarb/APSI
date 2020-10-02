type StringOrNumber = string | number;

let objeto = {
    nombre: "Pepe",
    apellidos: "Perez",
    edad: 23,
    amigos: [
        {
            nombre: "Alberto",
            apellido: "Gomez",
            edad: 24
        },
        {
            nombre: "Laura",
            apellido: "Martinez",
            edad: 20
        }
    ]
};

let objeto1 = {
    nombre: 'Miguel',
    apellido: 'Carballo',
    edad: 22
}

let objeto2 = {
    nombre: "Pepe",
    apellidos: "Perez",
    edad: 23,
    amigos: [
        {
            nombre: "Alberto",
            apellido: "Gomez",
            edad: 24
        },
        {
            nombre: "Laura",
            apellido: "Martinez",
            edad: 2
        }
    ]
};

let objeto3 = {
    name: "Pepe",
    apellidos: "Perez",
    edad: 23,
    amigos: [
        {
            nombre: "Alberto",
            apellido: "Gomez",
            edad: 24
        },
        {
            nombre: "Laura",
            apellido: "Martinez",
            edad: 20
        }
    ]
};

/* 
    tipo al objeto así: o:{[index: string]: any}, porque si le pongo StringOrNumber aunque añada object
    a StringOrNumber el forEach no lo reconoce como objeto, por eso el any ahí me parece necesario
*/

/* 
    iterateObjectRec parte el objeto en arrays de valores string o number y los concatena recursivamente,
    así es más fácil luego comparar los objetos por valor al comparar los arrays con los valores básicos
    de cada objeto y para imprimir lo mismo, imprime los valores básicos del objeto metidos en el array
*/
const iterateObjectRec = (o:{[index: string]: any}, indexes:string[], n:number):StringOrNumber[] => {
    let auxo:StringOrNumber[] = [];
    let auxindexes:string[] = [];
    if((typeof o[indexes[n]] === "string" || typeof o[indexes[n]] === "number") && n != indexes.length){
        auxo.push(o[indexes[n]]);
        auxo = auxo.concat(iterateObjectRec(o, indexes, n + 1));
    }else if(typeof o[indexes[n]] == "object"){
        o[indexes[n]].forEach((obj:{[index: string]: any}) => {
            Object.keys(obj).forEach(key => auxindexes.push(key));
            auxo = auxo.concat(iterateObjectRec(obj, auxindexes, 0));
        })
    }
    return auxo;
}
// printObject imprime los valores básicos del objeto que se pasan a un array primero
const printObject = (o:{[index: string]: any}) => {
    let indexes:string[] = [];
    Object.keys(o).forEach(key => indexes.push(key));
    console.log(iterateObjectRec(o, indexes, 0));
}
// deepEqual compara los objetos por valor comparando los arrays con los valores básicos de cada objeto
const deepEqual = (o1:{[index: string]: any}, o2:{[index: string]: any}):boolean => {
    let indexesO1:string[] = [];
    let indexesO2:string[] = [];
    let auxo1:StringOrNumber[] = [];
    let auxo2:StringOrNumber[] = [];
    let equal: boolean[] = [];
    let cont:number = 0;
    let equalR: boolean = false;

    Object.keys(o1).forEach(key => indexesO1.push(key));
    Object.keys(o2).forEach(key => indexesO2.push(key));

    auxo1 = iterateObjectRec(o1, indexesO1, 0);
    auxo2 = iterateObjectRec(o2, indexesO2, 0);

    for(let i=0; i<=auxo1.length; i++){ // Comparar por valor (==)
        if(auxo1[i] == auxo2[i])   
            equal.push(true);
        else
            equal.push(false);
    }
    equal.forEach(value => {
        if(value == true)   cont++;
    })
    if(cont == equal.length)    equalR = true;
    return equalR;
}

const deepCopy = (o:{[index: string]: any}):object =>{
    // lo comentado es el intento de copiar por valor, no me dio tiempo, le falta meter objetos y arrays en el objeto

    /*let indexes:string[] = [];
    let arrayObj:StringOrNumber[] = [];
    Object.keys(o).forEach(key => indexes.push(key));
    arrayObj = iterateObjectRec(o, indexes, 0);
    let obj:{[index: string]: any} = new Object(indexes);
    Object.keys(obj).forEach((index, n:number = 0) => {
        console.log(typeof obj[index]);
        obj[index] = arrayObj[n];
    })*/
    let copy = JSON.parse(JSON.stringify(o));
    return copy;
}

printObject(objeto); // array con valores del objeto, el ultimo valor se repite,pendiente para corregir 
console.log(deepEqual(objeto, objeto2)); // false, ya que la edad de laura es distinta
console.log(deepEqual(objeto, objeto3)); // true, ya que los valores son los mismos aunque name(objeto3) != nombre(objeto)
console.log(deepCopy(objeto));