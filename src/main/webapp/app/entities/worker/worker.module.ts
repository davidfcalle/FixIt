import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FixitSharedModule } from '../../shared';
import { FixitAdminModule } from '../../admin/admin.module';
import {
    WorkerService,
    WorkerPopupService,
    WorkerComponent,
    WorkerDetailComponent,
    WorkerDialogComponent,
    WorkerPopupComponent,
    WorkerDeletePopupComponent,
    WorkerDeleteDialogComponent,
    workerRoute,
    workerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...workerRoute,
    ...workerPopupRoute,
];

@NgModule({
    imports: [
        FixitSharedModule,
        FixitAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        WorkerComponent,
        WorkerDetailComponent,
        WorkerDialogComponent,
        WorkerDeleteDialogComponent,
        WorkerPopupComponent,
        WorkerDeletePopupComponent,
    ],
    entryComponents: [
        WorkerComponent,
        WorkerDialogComponent,
        WorkerPopupComponent,
        WorkerDeleteDialogComponent,
        WorkerDeletePopupComponent,
    ],
    providers: [
        WorkerService,
        WorkerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FixitWorkerModule {}
