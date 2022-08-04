import { API_URL, FrontendURL} from "../config.mjs";
import { CrudView } from "../view/crudView.mjs";
import { crudService } from "../model/services/crudService.mjs";

export class CrudController{

   #privateApiyURL;
   #privateView;


   constructor(){
      this.#privateView = new CrudView();
      this.#privateApiyURL = API_URL;
   }

   async init(){
      const servicio = new crudService(this.#privateApiyURL);
      const cards = await servicio.getCard();
      this.#privateView.init(cards);
   }

   async update(id, name, constelacion){
      
      if(name == "" || constelacion == ""){
         Swal.fire(
            'Error',
            'Ingresar un nombre nuevo al tablero que desea editar',
            'error'
         )
      }else{
         Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: 'Se actualizo correctamente',
            showConfirmButton: false,
            timer: 9000
         })
         const service = new crudService(this.#privateApiyURL);
         let data = { "id":id, "name":name, "constelacion":constelacion };
         await service.update(data);
      }
   }

   /* Metodo Create */
   async create(name, constelacion){
      
      if(name == "" || constelacion == ""){
         Swal.fire({
            text: "Ingrese el nombre y la constelacion",
            icon: 'warning',
            showCancelButton: false,
            cancelButtonColor: '#d33',
         })
      }else{
         const service = new crudService(this.#privateApiyURL);
         let data = { "name":name, "constelacion":constelacion };
         await service.create(data);
      
         Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
         })
      }
   }


   /*Metodo delete */
   async delete(id){
      Swal.fire({
         title: 'Seguro de que desea eliminar?',
         text: "Esta apunto de eliminar la targeta!!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
      if (result.isConfirmed) {
            Swal.fire(
               'Se elimino!',
               'La targeta se elimino correctamente',
               'success'
            )
            const service = new crudService(this.#privateApiyURL);
            service.delete(id);
         }
      })
   }
}


let crudController = new CrudController();
crudController.init();