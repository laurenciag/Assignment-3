import { Component, OnInit } from '@angular/core';
import { Items } from '../../constants/item';
import { ItemService } from '../../service/item.service';
import { v4 as uuidv4 } from 'uuid';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  items: Items[];
  // name: string;
  // typeItem: string;
  // uuid: string;
  // id: number;
  // expiredDate: Date;
  datePick;
  addItem: Items;
  editItems: Items;
  constructor(private itemService: ItemService, private modalService: NgbModal) { 
    this.addItem = new Items;
    this.editItems = new Items;
  }

  ngOnInit(): void {
    this.getItems();
  }


  getItems(): void {
    this.itemService.getItems()
      .subscribe((item) => {
        this.items = item;

      });
  }

  deleteItems(id): void {
    this.itemService.deleteItem(id).subscribe(() => {
      this.itemService.getItems().subscribe((item) => {
        this.items = item;
      })
    })
  }

  openEdit(content, item){
    this.modalService.open(content);
    // this.editItems = item;
    this.editItems.id = item.id;
    this.editItems.uuid = item.uuid;
    this.editItems.name = item.name;
    this.editItems.typeItem = item.typeItem;
    // this.editItems.expiredDate = (this.datePick).getTime()/1000;
  }

  openAdd(content){
    this.modalService.open(content);
  }

  saveItem() {
    this.addItem.expiredDate = (new Date(this.datePick.year, this.datePick.month-1, this.datePick.day )).getTime() / 1000;
    this.addItem.uuid = uuidv4();
    console.log("saveItem", this.addItem );
    this.itemService.addItem( this.addItem)
      .subscribe((dataItem) => {
        this.getItems();
        this.modalService.dismissAll();
      })
  }

  editItem(id) {
    this.editItems.expiredDate = (new Date(this.datePick.year, this.datePick.month-1, this.datePick.day )).getTime() / 1000;
    console.log("saveItem", this.editItem);
    this.itemService.editItem( this.editItems).subscribe((dataItem) =>
      {
       this.getItems()
         this.modalService.dismissAll();
       })
  }
}
