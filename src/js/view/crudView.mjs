'use strict';
import { crudService } from '../model/services/crudService.mjs'; 
import {CrudController} from '../controller/crudController.mjs';


export class CrudView {

   #privateBody;
   #crudService;


   constructor() {
      document.title = "CRUD SAINT-SEIYA API"; 
      this.#privateBody = document.querySelector('body');
      this.#crudService = new crudService();
   }

   async init(){
      var cardSeiya =  await this.#crudService.getCard();
      console.log(cardSeiya);

      const controlador = new CrudController();

      const inpurtCreateNombre = document.createElement('input');
      inpurtCreateNombre.type = 'text';
      inpurtCreateNombre.classList.add('form-control');
      inpurtCreateNombre.placeholder = 'Nombre personaje:';
      inpurtCreateNombre.required = true;
      this.#privateBody.appendChild(inpurtCreateNombre);

      const inpurtCreateC = document.createElement('input');
      inpurtCreateC.type = 'text';
      inpurtCreateC.classList.add('form-control');
      inpurtCreateC.placeholder = 'Constelacion:';
      inpurtCreateC.required = true;
      this.#privateBody.appendChild(inpurtCreateC);

      const create = document.createElement('button');
      create.innerHTML = 'Create';
      create.type = "button";
      create.classList.add('buttonCreate','btn','btn-success');
      create.value = "Crear";
      create.addEventListener('click', () => { 
         controlador.create(
            inpurtCreateNombre.value, 
            inpurtCreateC.value 
         );
      })
      this.#privateBody.appendChild(create);


      cardSeiya.forEach((cardSeiyas) => {
         console.log(cardSeiyas);
         var card = this.privateCardCrud(cardSeiyas);
         this.#privateBody.appendChild(card);
      });
   }

   
   privateCardCrud(cardSeiyas){

      const controlador = new CrudController();
      var card = document.createElement('div');

      card.classList.add('card');
      card.innerHTML = `
         <div class="card-body">
            <h5 class="card-title">Nombre Persobnaje: ${cardSeiyas.getName()}</h5>
            <p class="card-text">Constelacion: ${cardSeiyas.getConstelacion()}</p>
         </div>`;

      /* Elemento HTML actualizar */
      const inputEditarNombre = document.createElement('input');
      inputEditarNombre.type = 'text';
      inputEditarNombre.classList.add('form-control');
      inputEditarNombre.id = `inputEditar${cardSeiyas.getId()}`;
      inputEditarNombre.placeholder = 'Nombre personaje:';
      card.appendChild(inputEditarNombre);

      const inputEditarC = document.createElement('input');
      inputEditarC.type = 'text';
      inputEditarC.classList.add('form-control');
      inputEditarC.id = `inputEditar${cardSeiyas.getId()}`;
      inputEditarC.placeholder = 'Constelacion:';
      //inputEditarC.value = cardSeiyas.getConstelacion();
      card.appendChild(inputEditarC);
      
      const editar = document.createElement('button');
      editar.innerHTML = 'Editar';
      editar.type = "button";
      editar.classList.add('button','btn','btn-primary');
      editar.value = "Editar";
      editar.addEventListener('click', () => { 
         controlador.update(cardSeiyas.getId(), 
         inputEditarNombre.value, 
         inputEditarC.value
         );

      })
      card.appendChild(editar);



      /*Boton delete  un personaje*/
      const borrar = document.createElement('button');
      borrar.innerHTML = 'Borrar';
      borrar.type = "Button";
      borrar.classList.add('buttonDelete','mt-1','mb-2','btn','btn-outline-danger');
      borrar.value = "Eliminar";
      borrar.addEventListener('click', () => { 
         controlador.delete(cardSeiyas.getId());
      })
      card.appendChild(borrar);
      return card;
   }   
}
