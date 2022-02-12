import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this._router.navigate(['search', form.value]);
  }
}
