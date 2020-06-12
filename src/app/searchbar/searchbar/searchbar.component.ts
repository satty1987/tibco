import { Component, OnInit } from '@angular/core';
import { GetSolutionService } from 'src/app/service/get-solution.service';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  nameSearch: any;
  showData = true;
  ceList: any[] = [];
  error = ''
  isError = false;
    // pagination
  length = 0;
  option = {
    pageIndex: 0,
    pageSize: 5
  };
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  result: any[] = [];
    // pagination end
  constructor(private getSolutionService: GetSolutionService, public dialog: MatDialog) { }


  ngOnInit() {
  }

  disabled() {
    if (this.nameSearch == null) {
      return true;
    }
    return false;
  }
  getSolutions() {
    console.log(this.nameSearch);

    this.getSolutionService.getCE(this.nameSearch).subscribe((data: any[]) => {
      console.log(data);
      this.showData = false;
      this.isError = false;
      this.ceList = data;
        // pagination
      this.updateRecord(this.option);
      this.length = this.ceList.length;
        // pagination end
    },
      err => {
        this.error = 'Nothing found in database';
        this.isError = true;
      })


  }
  searchAgain() {
    this.showData = true;
    this.nameSearch = null;
  }

  // pagination
  updateRecord(page) {
    this.result = this.requestedRedcord(this.ceList, page);
  }

  requestedRedcord(record, options) {
    const data = [...record];
    return data.splice(options.pageIndex * options.pageSize, options.pageSize);
  }
  // pagination end

//dialog code

openDialog(): void {
  const dialogRef = this.dialog.open(DialogBoxComponent, {
    width: '550px',
    data: {
      name: "Test Name",
      discription: "discription"
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    /// call service
    console.log('The dialog was closed and go for operation', result);
  });
}

//dialog code end



}
