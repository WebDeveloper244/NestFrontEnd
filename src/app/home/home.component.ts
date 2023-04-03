import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public bookForm: any | FormGroup;
  constructor(
    private readonly formbuilder: FormBuilder,
    private readonly service: SharedService
  ){
    this.bookFormIntialization();
  }

  bookFormIntialization() {
    this.bookForm = this.formbuilder.group({
      category: new FormControl('', Validators.required),
      author: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      title: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    })
  }


  submitBookForm() {
    const payLoad = this.bookForm.value
    console.log(payLoad);
    this.service.createBookData(payLoad).subscribe((res: any) => {
      console.log(res);
      this.bookForm.reset()
    })
}
}
