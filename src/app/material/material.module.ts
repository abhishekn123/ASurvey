import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button'
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatSliderModule,MatCardModule,MatTableModule,MatFormFieldModule,MatPaginatorModule,
    MatButtonModule,MatMenuModule,MatIconModule,MatExpansionModule,MatDialogModule,MatInputModule,MatSnackBarModule,MatDatepickerModule,MatNativeDateModule,MatSelectModule,MatProgressSpinnerModule
  ],
  exports:[MatSliderModule,MatCardModule,MatTableModule,MatFormFieldModule,MatPaginatorModule,MatButtonModule,MatMenuModule
  ,MatIconModule,MatExpansionModule,MatDialogModule,MatInputModule,MatSnackBarModule,MatDatepickerModule,MatNativeDateModule,MatSelectModule,MatProgressSpinnerModule]
})
export class MaterialModule { }
