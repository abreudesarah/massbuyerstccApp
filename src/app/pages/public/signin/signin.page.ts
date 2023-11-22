import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  current_year: number = new Date().getFullYear();

  signin_form: FormGroup;
  submit_attempt: boolean = false;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {

    this.signin_form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    this.signin_form.get('email').setValue('massbuyers@gmail.com');
    this.signin_form.get('password').setValue('123456');
  }

  async signIn() {

    this.submit_attempt = true;

    // Se a senha e o email estiverem vazios ou invalidos
    if (this.signin_form.value.email == '' || this.signin_form.value.password == '') {
      this.toastService.presentToast('Erro', 'Cheque os campos de email e senha', 'top', 'danger', 2000);

    } else {

      const loading = await this.loadingController.create({
        cssClass: 'default-loading',
        message: '<p>Entrando...</p><span>Por favor espere um pouco.</span>',
        spinner: 'crescent'
      });
      await loading.present();

      // Fake timeout
      setTimeout(async () => {
        // sucesso
        await this.router.navigate(['/home']);
        loading.dismiss();
      }, 2000);

    }
  }

}
