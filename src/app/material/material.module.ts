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
import {MatStepperModule} from '@angular/material/stepper';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatRippleModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSortModule} from '@angular/material/sort';
import {MatTreeModule} from '@angular/material/tree';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatSliderModule,MatCardModule,MatTableModule,MatFormFieldModule,MatPaginatorModule,MatSlideToggleModule,
    MatButtonModule,MatMenuModule,MatIconModule,MatExpansionModule,MatDialogModule,MatInputModule,MatSnackBarModule,MatDatepickerModule,MatNativeDateModule,MatSelectModule,MatProgressSpinnerModule,MatStepperModule,MatGridListModule,MatBadgeModule,MatListModule,MatDividerModule,MatRippleModule,MatToolbarModule,MatSidenavModule,MatTreeModule,MatSortModule
  ],
  exports:[MatSliderModule,MatCardModule,MatTableModule,MatFormFieldModule,MatPaginatorModule,MatButtonModule,MatMenuModule
  ,MatIconModule,MatExpansionModule,MatDialogModule,MatInputModule,MatSnackBarModule,MatDatepickerModule,MatNativeDateModule,MatSelectModule,MatProgressSpinnerModule,MatStepperModule,MatSlideToggleModule,MatGridListModule,MatBadgeModule,MatListModule,MatDividerModule,MatRippleModule,MatToolbarModule,MatSidenavModule,MatTreeModule,MatSortModule]
})
export class MaterialModule { }
