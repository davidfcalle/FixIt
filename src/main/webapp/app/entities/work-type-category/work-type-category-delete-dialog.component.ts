import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { WorkTypeCategory } from './work-type-category.model';
import { WorkTypeCategoryPopupService } from './work-type-category-popup.service';
import { WorkTypeCategoryService } from './work-type-category.service';

@Component({
    selector: 'jhi-work-type-category-delete-dialog',
    templateUrl: './work-type-category-delete-dialog.component.html'
})
export class WorkTypeCategoryDeleteDialogComponent {

    workTypeCategory: WorkTypeCategory;

    constructor(
        private workTypeCategoryService: WorkTypeCategoryService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.workTypeCategoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'workTypeCategoryListModification',
                content: 'Deleted an workTypeCategory'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('fixitApp.workTypeCategory.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-work-type-category-delete-popup',
    template: ''
})
export class WorkTypeCategoryDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private workTypeCategoryPopupService: WorkTypeCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.workTypeCategoryPopupService
                .open(WorkTypeCategoryDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
