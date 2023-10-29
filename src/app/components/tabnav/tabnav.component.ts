import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ITabElements } from '../domain/tabnav-elements.interface';

@Component({
  selector: 'app-tabnav',
  standalone: true,
  templateUrl: './tabnav.component.html',
  styleUrls: ['./tabnav.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class TabnavComponent implements OnInit {
  @Input() tabList: ITabElements[];
  public list: ITabElements[] = [];

  constructor() {}

  ngOnInit() {
    this.list = this.tabList;
  }
}
