import { NgModule } from '@angular/core';
import { OrderByPipe } from '../shared/pipes/orderby.pipe';

@NgModule({
    declarations: [OrderByPipe],
    exports: [OrderByPipe]
})

export class SharedModule {
    static forRoot() {
        return {
            ngModule: OrderByPipe,
            providers: [],
        };
    }
}