import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  public allBooks: any = [];
  public deleteId: any;
  public makeMyIdPublic: any;
  public updatingBookForm: any |FormGroup;

  constructor(
    private readonly formbuilder: FormBuilder,
    private readonly service: SharedService
  ) {
    this.getAllBookData()
    this.updatebookFormIntialization()
  }
  updatebookFormIntialization() {
    this.updatingBookForm = this.formbuilder.group({
      category: new FormControl('', Validators.required),
      author: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      title: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    })
  }

  getAllBookData() {
    this.service.getAllBookData().subscribe((res: any) => {
      this.allBooks = res.result.filter((element: any) => element.status === 0)

    });
  }

  getBookDataWithId(_id: any) {
    this.makeMyIdPublic = _id
    this.service.getIdBookData(_id).subscribe((res: any) => {
      // console.log(res);
      this.allBooks = [res]
      console.log(this.allBooks[0]?.author);
      // console.log(this.allBooks);

      this.updatingBookForm = this.formbuilder.group({
        category: new FormControl(this.allBooks[0]?.category),
        author: new FormControl(this.allBooks[0]?.author),
        title: new FormControl(this.allBooks[0]?.title),
        price: new FormControl(this.allBooks[0]?.price),
        // category: new FormControl(this.allBooks?.category),
        // author: new FormControl(this.allBooks?.author),
        // title: new FormControl(this.allBooks?.title),
        // price: new FormControl(this.allBooks?.price),
      })

    });
  }


  openModal(_id: any) {
    this.deleteId = _id
    this.getAllBookData()
  }

  deleteBookWithId(_id: any) {
    console.log(_id);
    this.service.deleteBookWithId(_id).subscribe((res: any) => {
      console.log(res.result);
      this.getAllBookData()
    })
  }

  softDeleteBookWithId(_id: any) {
    this.service.softDeleteBookWithId(_id).subscribe((res: any) => {
      console.log(res.result);
      this.getAllBookData()
    })
  }

  updateBookForm() {
    let payLoad = this.updatingBookForm.value;
    payLoad['_id'] = this.makeMyIdPublic;
    const result = [payLoad]
    console.log(result);
    this.service.updateBookData(result).subscribe((res: any) => {
      console.log(res);
      this.getBookDataWithId([this.makeMyIdPublic])
    })
  
}





  
}
