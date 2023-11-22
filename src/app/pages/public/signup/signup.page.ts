import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  current_year: number = new Date().getFullYear();

  signup_form: FormGroup;
  submit_attempt: boolean = false;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signup_form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      cpf: ['', Validators.compose([Validators.minLength(11), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      password_repeat: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    this.signup_form.get('email').setValue('massbuyers@gmail.com');
    this.signup_form.get('password').setValue('123456');
  }


  async signUp() {

    this.submit_attempt = true;

    // Se os campos email e a senha estiverem vazios
    if (this.signup_form.value.email == '' || this.signup_form.value.password == '' || this.signup_form.value.password_repeat == '') {
      this.toastService.presentToast('Erro', 'Por favor preencha todos os campos.', 'Campos vazios.', 'Campos vazios.', 4000);

      // Se as senhas não combinam
    } else if (this.signup_form.value.password != this.signup_form.value.password_repeat) {
      this.toastService.presentToast('Erro', 'Senhas não combinam', 'Senhas não combinam', 'Erro', 4000);

    } else {
      const loading = await this.loadingController.create({
        cssClass: 'default-loading',
        message: '<p>Cadastrando...</p><span>Por favor aguarde.</span>',
        spinner: 'crescent'
      });
      await loading.present();


      // Mensagem de sucesso
      this.toastService.presentToast('Bem-Vindo', 'Bem-Vindo ao MassBuyers', 'Cadastro concluído!', 'Seja bem-vindo!', 2000);
      await this.router.navigate(['/home']);
      loading.dismiss();
    }
  }

}
