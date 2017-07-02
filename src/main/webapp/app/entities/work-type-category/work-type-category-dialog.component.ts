import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WorkTypeCategory } from './work-type-category.model';
import { WorkTypeCategoryPopupService } from './work-type-category-popup.service';
import { WorkTypeCategoryService } from './work-type-category.service';
import { WorkType, WorkTypeService } from '../work-type';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-work-type-category-dialog',
    templateUrl: './work-type-category-dialog.component.html'
})
export class WorkTypeCategoryDialogComponent implements OnInit {

    workTypeCategory: WorkTypeCategory;
    authorities: any[];
    isSaving: boolean;

    worktypes: WorkType[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private workTypeCategoryService: WorkTypeCategoryService,
        private workTypeService: WorkTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.workTypeService.query()
            .subscribe((res: ResponseWrapper) => { this.worktypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.workTypeCategory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.workTypeCategoryService.update(this.workTypeCategory), false);
        } else {
            this.subscribeToSaveResponse(
                this.workTypeCategoryService.create(this.workTypeCategory), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<WorkTypeCategory>, isCreated: boolean) {
        result.subscribe((res: WorkTypeCategory) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: WorkTypeCategory, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'fixitApp.workTypeCategory.created'
            : 'fixitApp.workTypeCategory.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'workTypeCategoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackWorkTypeById(index: number, item: WorkType) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-work-type-category-popup',
    template: ''
})
export class WorkTypeCategoryPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private workTypeCategoryPopupService: WorkTypeCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.workTypeCategoryPopupService
                    .open(WorkTypeCategoryDialogComponent, params['id']);
            } else {
                this.modalRef = this.workTypeCategoryPopupService
                    .open(WorkTypeCategoryDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
