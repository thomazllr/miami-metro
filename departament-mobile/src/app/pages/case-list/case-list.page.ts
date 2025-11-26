import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CaseService } from '../../services/case.service';
import { Case } from '../../models/case.model';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.page.html',
  styleUrls: ['./case-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CaseListPage implements OnInit {
  cases: Case[] = [];

  constructor(private caseService: CaseService) { }

  ngOnInit() {
    this.loadCases();
  }

  loadCases() {
    this.caseService.getCases().subscribe(data => {
      this.cases = data;
    });
  }
}
