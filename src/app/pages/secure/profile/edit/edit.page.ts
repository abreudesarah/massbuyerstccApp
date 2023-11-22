import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  edit_profile_form: FormGroup;
  submit_attempt: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private navController: NavController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {

    this.edit_profile_form = this.formBuilder.group({
      name_first: ['', Validators.required],
      name_last: ['', Validators.required]
    });

    this.edit_profile_form.get('name_first').setValue('Mass');
    this.edit_profile_form.get('name_last').setValue('Buyers');
  }

  async updateProfilePicture() {

    const actionSheet = await this.actionSheetController.create({
      header: 'Escolher foto existente ou tirar uma nova',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Escolher da Galeria',
          icon: 'images',
          handler: () => {
          }
        },
        {
          text: 'Tirar uma Foto',
          icon: 'camera',
          handler: () => {
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }]
    });
    await actionSheet.present();
  }


  submit() {

    this.submit_attempt = true;


    if (this.edit_profile_form.valid) {


      this.toastService.presentToast('Successo', 'Perfil salvo', 'top', 'successo', 2000);
      this.navController.back();

    } else {

      //Mensagem de erro
      this.toastService.presentToast('Erro', '*Por favor preencha todos os campos vazios', 'top', 'perigo', 2000);
    }
  }

}
