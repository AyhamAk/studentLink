import {ChangeDetectorRef, Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ApartmentService} from "../../../services/apartment-service";

@Component({
  selector: 'app-dialog-animation',
  templateUrl: './dialog-animation.component.html',
  styleUrls: ['./dialog-animation.component.css']
})
export class DialogAnimationComponent implements OnInit {
  @Input() apartmentName!: string

  constructor(public dialogRef: MatDialogRef<DialogAnimationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { owner: string, ownerId: string,shouldDelete:boolean },
              private apartmentService: ApartmentService,) {
  }

  ngOnInit(): void {
  }

  deleteapartment() {
    this.dialogRef.close({ data: 'shouldDelete' });
  }
}
