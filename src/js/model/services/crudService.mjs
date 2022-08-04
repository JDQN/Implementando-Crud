import {CrudModel} from '../crudModel.mjs';
import { API_URL, FrontendURL} from "../../config.mjs";

export class crudService{

   #privateUrl;

   constructor(){
      this.#privateUrl = API_URL;
   }

   async getCard(){
      const cardData = await this.getData();
      const arrayCards = new Array();
      cardData.forEach((card) => {
         arrayCards.push(new CrudModel(card.id, card.name, card.constelacion));
      });
      return arrayCards;
   }
   getData(){
      return fetch(`${this.#privateUrl}/santos`)
      .then(response => response.json())
   }


   /* Metodo updater */
   async update(data){
      const card = new CrudModel(data.id, data.name, data.constelacion);
      const cardData = await this.putData(card);
      console.log(card);
   }
   putData(card){
      console.log(card.getName());
      return fetch(`${this.#privateUrl}/santos/${card.getId()}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(
            {
               "name":card.getName(), 
               "constelacion":card.getConstelacion() 
            }) 
      })
   }


   /* Metodo create */
   async create(data){
      const card = new CrudModel();
      
      card.setName(data.name);
      card.setConstelacion(data.constelacion);

      const cardData = await this.postData(card);
      console.log(cardData);
   }
   postData(card){
      console.log(card.getName());

      Swil
      return fetch(`${this.#privateUrl}/santos`,{
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(
            {
               "name":card.getName(), 
               "constelacion":card.getConstelacion() 
            }) 
      })
   }


    /* Metodo delete */
   async delete(id){
      const cardData = await this.deleteData(id);
   }
   deleteData(id){
      return fetch(`${this.#privateUrl}/santos/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json'
         },
      })
   }
}