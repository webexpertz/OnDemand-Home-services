import { NgModule } from '@angular/core';
import { EditserviceComponent } from './editservice/editservice';
import { ServiceModalComponent } from './service-modal/service-modal';
@NgModule({
	declarations: [EditserviceComponent,
    ServiceModalComponent],
	imports: [],
	exports: [EditserviceComponent,
    ServiceModalComponent]
})
export class ComponentsModule {}
