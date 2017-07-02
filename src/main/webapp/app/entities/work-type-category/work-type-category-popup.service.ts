import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { WorkTypeCategory } from './work-type-category.model';
import { WorkTypeCategoryService } from './work-type-category.service';

@Injectable()
export class WorkTypeCategoryPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private workTypeCategoryService: WorkTypeCategoryService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.workTypeCategoryService.find(id).subscribe((workTypeCategory) => {
                this.workTypeCategoryModalRef(component, workTypeCategory);
            });
        } else {
            return this.workTypeCategoryModalRef(component, new WorkTypeCategory());
        }
    }

    workTypeCategoryModalRef(component: Component, workTypeCategory: WorkTypeCategory): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.workTypeCategory = workTypeCategory;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
