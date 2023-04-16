import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-prime',
  templateUrl: './prime.component.html',
  styleUrls: ['./prime.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PrimeComponent {
  public allBooks: any = [];
  public showDialogBox: boolean = false;
  public showEditFormBox: boolean = false;
  public position: any;
  public makeMyIdPublic: any
  public editFormId: any;
  public updatingBookForm: any | FormGroup;
  public books: any;
  public selectedBooks: any;

  constructor(
    private readonly service: SharedService,
    private readonly formbuilder: FormBuilder,
    private messageService: MessageService, private confirmationService: ConfirmationService
  ) {
    this.getAllBookData()
  }

  showDialog(position: string, Id: string) {
    this.showDialogBox = true;
    this.position = position;
    this.makeMyIdPublic = Id
    console.log(this.makeMyIdPublic);

  }

  updatebookFormIntialization() {
    this.updatingBookForm = this.formbuilder.group({
      category: new FormControl('', Validators.required),
      author: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      title: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    })
  }

  EditFormDialog() {
    this.showEditFormBox = true
  }

  getAllBookData() {
    this.service.getAllBookData().subscribe((res: any) => {
      this.allBooks = res.result.filter((element: any) => element.status === 0)
      console.log(this.allBooks);

    });
  }

  getBookDataWithId(_id: any) {
    console.log(_id);
    this.service.getIdBookData(_id).subscribe((res: any) => {
      this.allBooks = [res]

    });
  }

  deleteBookWithId(_id: any) {
    console.log(_id);
    this.service.deleteBookWithId(_id).subscribe((res: any) => {
      console.log(res.result);
      this.getAllBookData()
    })
  }

  deleteSelectedBooks() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.books = this.allBooks.filter((val: any) => !this.selectedBooks.includes(val));
        this.allBooks = this.allBooks.filter((book:any) => !this.selectedBooks.includes(book));
        this.selectedBooks = [];
        this.selectedBooks = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
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
