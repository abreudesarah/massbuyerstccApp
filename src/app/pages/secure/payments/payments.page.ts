import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { FilterPage } from './filter/filter.page';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})


export class PaymentsPage implements OnInit {

  content_loaded: boolean = false;



  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
  ) { }




  ngOnInit() {

    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);
  }

  async filter() {

    const modal = await this.modalController.create({
      component: FilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    await modal.present();

    let { data } = await modal.onWillDismiss();

    if (data) {

      this.content_loaded = false;

      setTimeout(() => {
        this.content_loaded = true;
      }, 2000);
    }
  }
}
