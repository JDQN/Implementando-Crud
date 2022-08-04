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
      const update = await name == "" || constelacion == "";

      if(update){
         Swal.fire({
            icon: 'error',
            title: 'Your work has been saved',
            text: 'Please, fill the fields'
         })
      }
      const service = new crudService(this.#privateApiyURL);
      let data = { "id":id, "name":name, "constelacion":constelacion };
      await service.update(data);
   }

   /* Metodo Create */
   async create(name, constelacion){
      const service = new crudService(this.#privateApiyURL);
      let data = { "name":name, "constelacion":constelacion };
      await service.create(data);
   }

   /*Metodo delete */
   async delete(id){
      const service = new crudService(this.#privateApiyURL);
      await service.delete(id);
   }
}


let crudController = new CrudController();
crudController.init();