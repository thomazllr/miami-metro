import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { KillerService } from '../../services/killer.service';
import { Killer } from '../../models/killer.model';

@Component({
  selector: 'app-killer-list',
  templateUrl: './killer-list.page.html',
  styleUrls: ['./killer-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class KillerListPage implements OnInit {
  killers: Killer[] = [];

  constructor(private killerService: KillerService) { }

  ngOnInit() {
    this.loadKillers();
  }

  loadKillers() {
    this.killerService.getKillers().subscribe(data => {
      this.killers = data;
    });
  }
}
