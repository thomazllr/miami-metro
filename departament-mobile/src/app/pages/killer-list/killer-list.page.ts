import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  filterOutline, addOutline, imagesOutline, chevronForwardOutline, closeOutline 
} from 'ionicons/icons';
import { KillerService } from '../../services/killer.service';
import { Killer } from '../../models/killer.model';

@Component({
  selector: 'app-killer-list',
  templateUrl: './killer-list.page.html',
  styleUrls: ['./killer-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class KillerListPage implements OnInit {
  killers: Killer[] = [];
  selectedImage: string | null = null;
  isModalOpen = false;

  constructor(private killerService: KillerService) {
    addIcons({ 
      filterOutline, addOutline, imagesOutline, chevronForwardOutline, closeOutline
    });
  }

  ngOnInit() {
    this.loadKillers();
  }

  ionViewWillEnter() {
    this.loadKillers();
  }

  loadKillers(event?: any) {
    const searchTerm = event?.target?.value;
    this.killerService.getKillers(searchTerm).subscribe(data => {
      this.killers = data;
    });
  }

  handleSearch(event: any) {
    this.loadKillers(event);
  }

  openImage(event: Event, imageUrl: string) {
    event.stopPropagation();
    this.selectedImage = imageUrl;
    this.isModalOpen = true;
  }

  closeImage() {
    this.isModalOpen = false;
    this.selectedImage = null;
  }
}
