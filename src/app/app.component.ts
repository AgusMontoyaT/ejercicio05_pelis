import {Component} from '@angular/core';
import {IonApp, IonRouterOutlet} from '@ionic/angular/standalone';
import {register} from "swiper/element/bundle";
import {addIcons} from "ionicons";
import {moon, sunny} from "ionicons/icons";

// slider
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({moon, sunny})
  }
}
