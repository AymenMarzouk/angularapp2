import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, AlertService } from '../services';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  confirmForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private cookieService: CookieService,
        private _http:HttpClient
  ) { }

  ngOnInit(): void {
    this.confirmForm = this.formBuilder.group({
      code: ['']
  });
  }
  get f() { return this.confirmForm.controls; }
  onSubmit() {}
}
