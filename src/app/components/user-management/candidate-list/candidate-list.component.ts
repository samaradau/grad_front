import { Component, OnInit, NgModule } from '@angular/core';
import { CandidateListService } from '../../../services/candidate/candidate-list.service';
import { Candidate } from '../../../models/candidate/candidate';
import { AuthService } from '../../../services/authentication/auth.service';
import { Route } from '@angular/compiler/src/core';
import { PagerService } from '../../../services/pager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})

export class CandidateListComponent implements OnInit {
  page: number;
  amount: number;
  allCandidatesCount: number;
  pager: any = {};
  pagedItems: Candidate[];
  searchingLastName: string = null;
  order = 'lastName';
  reverse = false;

  constructor(
    private candidateService: CandidateListService,
    private authService: AuthService,
    private router: Router,
    private pagerService: PagerService) { }

  ngOnInit() {
    if (!this.authService.checkAccess(CandidateListComponent.name)) {
      this.router.navigate(['denied']);
    }
    this.page = 1;
    this.amount = 25;
    this.loadCandidatesCount(this.searchingLastName)
      .add(() => this.setPage(1));
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
    this.loadCandidates(
      this.pager.currentPage,
      this.pager.pageSize,
      this.searchingLastName,
      this.order,
      this.reverse);
  }

  onSelectAmount = (e) => {
    this.amount = e.target.value;
    this.setPage(this.page);
  }

  setPage(page: number) {
    if (page > this.pager.totalPages) {
      page = this.pager.totalPages;
    }

    if (page < 1) {
      page = 1;
    }

    this.pager = this.pagerService.getPager(this.allCandidatesCount, page, this.amount);
    this.loadCandidates(
      this.pager.currentPage,
      this.pager.pageSize,
      this.searchingLastName,
      this.order,
      this.reverse);
  }

  public startSearch(value: string) {
    this.searchingLastName = value;
    this.loadCandidatesCount(this.searchingLastName)
      .add(() => this.setPage(1));
  }

  private loadCandidates(page, amount, lastNamePart, order, reverse) {
    this.candidateService.getCandidates(page, amount, lastNamePart, order, reverse)
      .subscribe(candidates => {
        this.pagedItems = candidates;
      });
  }

  private loadCandidatesCount(lastNamePart) {
    return this.candidateService.getCandidatesCount(lastNamePart)
      .subscribe(count => {
        this.allCandidatesCount = count;
      });
  }
}
