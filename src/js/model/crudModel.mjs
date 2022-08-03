export class CrudModel{
   
   /* Atibutos */
   #privateId;
   #privateName;
   #privateConstelacion;


   constructor(id, name, constelacion){
      this.#privateId = id;
      this.#privateName = name;
      this.#privateConstelacion = constelacion;
   }

   /* Los get y set son metodos accesores porque acceden a
      los atributos de la clase 
      get= retorna valor = obtener
      set = asignar o modificar = asignar valor puedo utilizar un try catch para validar que el valor sea correcto 
   */
   getId(){
      return this.#privateId;
   }
   setId(id){
      this.#privateId = id;
   }

   getName(){
      return this.#privateName;
   }
   setName(name){
      this.#privateName = name;
   }

   getConstelacion(){
      return this.#privateConstelacion;
   }
   setConstelacion(constelacion){
      this.#privateConstelacion = constelacion;
   }

   /* Metodo toString vasicamente retorna los valore de la clase
      El this solo lo utilizo dentro d euna clase y no en una funcion
    */
   toString(){
      return `${this.#privateId} ${this.#privateName} ${this.#privateConstelacion}`;
   }
}

