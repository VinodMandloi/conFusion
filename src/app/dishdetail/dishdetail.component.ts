import { Component, OnInit } from '@angular/core';
import { DishDetail } from '../shared/dishdetail';
import {  Dish } from '../shared/dish';

const DISHDETAILS: DishDetail[] = [
  {
    comment: 'Imagine all the eatables, living in conFusion!',
    rating: '5 Stars',
    author: 'John Lemon',
  },
  {
    comment: 'Sends anyone to heaven, I wish I could get my mother-in-la. .',
    rating: '4 Stars',
    author: 'paul McVites',
  },
  {
    comment: 'Eat it, just eat it!',
    rating: '3 Stars',
    author: 'Micr,ael Jaikisr',
  },
  {
    comment: 'Ultimate, Reaching for the stars!',
    rating: '4 Stars',
    author: 'Ringo starry',
  },
  {
    comment: 'It is your birthday, we are gonna party!',
    rating: '2 Stars',
    author: '25 Cent',
  }

 ];

 const DISHDETAILS1: Dish[] = [
  {
    id: '0',
    name: 'Uthappizza',
    image: '/assets/images/uthappizza.png',
    category: 'mains',
    featured: true,
    label: 'Hot',
    price: '4.99',
    // tslint:disable-next-line:max-line-length
    description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.'
  },
];

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  comments = DISHDETAILS;
  selectedDish1 = DISHDETAILS1[0];

  constructor() { }

  ngOnInit() {
  }

}
