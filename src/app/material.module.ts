import {MatButtonModule, MatCheckboxModule, MatGridListModule} from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatTooltipModule, MatGridListModule],
  exports: [MatButtonModule, MatCheckboxModule, MatTooltipModule, MatGridListModule],
})
export class MaterialModule { }
