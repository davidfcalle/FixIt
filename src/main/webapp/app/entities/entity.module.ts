import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FixitWorkerModule } from './worker/worker.module';
import { FixitCustomerModule } from './customer/customer.module';
import { FixitAddressModule } from './address/address.module';
import { FixitWorkTypeCategoryModule } from './work-type-category/work-type-category.module';
import { FixitWorkTypeModule } from './work-type/work-type.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        FixitWorkerModule,
        FixitCustomerModule,
        FixitAddressModule,
        FixitWorkTypeCategoryModule,
        FixitWorkTypeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FixitEntityModule {}
