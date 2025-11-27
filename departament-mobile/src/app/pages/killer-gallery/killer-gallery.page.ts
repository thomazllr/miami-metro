import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { KillerService } from '../../services/killer.service';
import { Killer } from '../../models/killer.model';

@Component({
  selector: 'app-killer-gallery',
  templateUrl: './killer-gallery.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class KillerGalleryPage implements OnInit {
  killers: Killer[] = [];
  allPhotos: any[] = [];

  constructor(private killerService: KillerService) {}

  ngOnInit() {
    this.killerService.getKillers().subscribe(data => {
      this.killers = data;
      this.allPhotos = this.killers.reduce((acc: any[], k: Killer) => {
        if (k.photos) {
          const photos = k.photos.map((p: any) => ({...p, killerName: k.name}));
          return acc.concat(photos);
        }
        return acc;
      }, []);
    });
  }
}
