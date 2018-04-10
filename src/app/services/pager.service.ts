import { Injectable } from '@angular/core';
import * as _ from 'underscore';

@Injectable()
export class PagerService {

  private visiblePagesCount = 10;
  private centerPageIndex = 6;

  getPager(totalItems: number, currentPage: number = 1, pageSize: number ) {
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number, endPage: number;

    if (totalPages <= this.visiblePagesCount) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= this.centerPageIndex) {
            startPage = 1;
            endPage = this.visiblePagesCount;
        } else if (currentPage + this.visiblePagesCount - this.centerPageIndex >= totalPages) {
            startPage = totalPages - this.visiblePagesCount - 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - this.centerPageIndex - 1;
            endPage = currentPage + this.visiblePagesCount - this.centerPageIndex;
        }
    }

    const pages = _.range(startPage, endPage + 1);

    return {
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        pages: pages
    };
}

}
