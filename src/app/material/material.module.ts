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
import {MatInputModule} from '@angular/material/input'
@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatSliderModule,MatCardModule,MatTableModule,MatFormFieldModule,MatPaginatorModule,
    MatButtonModule,MatMenuModule,MatIconModule,MatExpansionModule,MatDialogModule,MatInputModule
  ],
  exports:[MatSliderModule,MatCardModule,MatTableModule,MatFormFieldModule,MatPaginatorModule,MatButtonModule,MatMenuModule
  ,MatIconModule,MatExpansionModule,MatDialogModule,MatInputModule]
})
export class MaterialModule { }
