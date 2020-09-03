import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Items } from '../constants/item';

@Injectable ({
    providedIn: 'root'
})
export class ItemService {
    private BASE_URL = 'https://5d60ae24c2ca490014b27087.mockapi.io/api/v1';
    constructor(
        private http: HttpClient){ }
        private id: number

        getItems(){
            return this.http.get<Items[]>(`${this.BASE_URL}/items`);
        }

        getItem(id){
            return this.http.get<Items[]>(`${this.BASE_URL}/items/${id}`);
        }

        deleteItem(id){
            return this.http.delete<Items>(`${this.BASE_URL}/items/${id}`);
        }

        addItem(dataItem){
            console.log(dataItem)
            return this.http.post<Items>(`${this.BASE_URL}/items`,dataItem);
        }

        editItem(dataItem){
            return this.http.put<Items>(`${this.BASE_URL}/items/${dataItem.id}`,dataItem);
        }
       
}

