import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PoliceService } from '../../services/police.service';
import { PoliceOfficer } from '../../models/police-officer.model';

@Component({
  selector: 'app-police-list',
  templateUrl: './police-list.page.html',
  styleUrls: ['./police-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PoliceListPage implements OnInit {
  officers: PoliceOfficer[] = [];

  constructor(private policeService: PoliceService) { }

  ngOnInit() {
    this.loadOfficers();
  }

  loadOfficers() {
    this.policeService.getOfficers().subscribe(data => {
      this.officers = data;
    });
  }
}
