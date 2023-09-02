import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabnav',
  standalone: true,
  templateUrl: './tabnav.component.html',
  styleUrls: ['./tabnav.component.scss'],
  imports: [IonicModule],
})
export class TabnavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
