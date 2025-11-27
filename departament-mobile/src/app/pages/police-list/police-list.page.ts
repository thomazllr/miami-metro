import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  filterOutline, addOutline, shieldCheckmarkOutline, 
  chevronForwardOutline, callOutline, mailOutline 
} from 'ionicons/icons';
import { PoliceService } from '../../services/police.service';
import { PoliceOfficer } from '../../models/police-officer.model';

@Component({
  selector: 'app-police-list',
  templateUrl: './police-list.page.html',
  styleUrls: ['./police-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class PoliceListPage implements OnInit {
  officers: PoliceOfficer[] = [];

  constructor(private policeService: PoliceService) {
    addIcons({ 
      filterOutline, addOutline, shieldCheckmarkOutline, 
      chevronForwardOutline, callOutline, mailOutline 
    });
  }

  ngOnInit() {
    this.loadOfficers();
  }

  ionViewWillEnter() {
    this.loadOfficers();
  }

  loadOfficers(event?: any) {
    const searchTerm = event?.target?.value;
    this.policeService.getOfficers(searchTerm).subscribe(data => {
      this.officers = data;
    });
  }

  handleSearch(event: any) {
    this.loadOfficers(event);
  }
}
