import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Output() private loadingIndecator = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
