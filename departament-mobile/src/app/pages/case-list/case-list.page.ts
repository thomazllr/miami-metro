import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  addOutline, filterOutline, folderOpen, 
  calendarOutline, skullOutline, chevronForwardOutline 
} from 'ionicons/icons';
import { CaseService } from '../../services/case.service';
import { Case } from '../../models/case.model';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.page.html',
  styleUrls: ['./case-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class CaseListPage implements OnInit {
  cases: Case[] = [];

  constructor(private caseService: CaseService) {
    addIcons({ 
      addOutline, filterOutline, folderOpen, 
      calendarOutline, skullOutline, chevronForwardOutline 
    });
  }

  ngOnInit() {
    this.loadCases();
  }

  ionViewWillEnter() {
    this.loadCases();
  }

  loadCases(event?: any) {
    let searchTerm = '';
    if (event) {
      if (event.detail && event.detail.value !== undefined) {
        searchTerm = event.detail.value;
      } else if (event.target && event.target.value !== undefined) {
        searchTerm = event.target.value;
      }
    }

    this.caseService.getCases(searchTerm).subscribe(data => {
      this.cases = data;
    });
  }

  handleSearch(event: any) {
    this.loadCases(event);
  }
}
