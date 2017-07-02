import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Worker } from './worker.model';
import { WorkerPopupService } from './worker-popup.service';
import { WorkerService } from './worker.service';
import { User, UserService } from '../../shared';
import { WorkType, WorkTypeService } from '../work-type';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-worker-dialog',
    templateUrl: './worker-dialog.component.html'
})
export class WorkerDialogComponent implements OnInit {

    worker: Worker;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    worktypes: WorkType[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private workerService: WorkerService,
        private userService: UserService,
        private workTypeService: WorkTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.workTypeService.query()
            .subscribe((res: ResponseWrapper) => { this.worktypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.worker.id !== undefined) {
            this.subscribeToSaveResponse(
                this.workerService.update(this.worker), false);
        } else {
            this.subscribeToSaveResponse(
                this.workerService.create(this.worker), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Worker>, isCreated: boolean) {
        result.subscribe((res: Worker) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Worker, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'fixitApp.worker.created'
            : 'fixitApp.worker.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'workerListModification', content: 'OK'});
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

    trackUserById(index: number, item: User) {
        return item.id;
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
    selector: 'jhi-worker-popup',
    template: ''
})
export class WorkerPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private workerPopupService: WorkerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.workerPopupService
                    .open(WorkerDialogComponent, params['id']);
            } else {
                this.modalRef = this.workerPopupService
                    .open(WorkerDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
