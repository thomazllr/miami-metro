import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline, folderOpenOutline, chevronForwardOutline } from 'ionicons/icons';
import { PoliceService } from '../../services/police.service';
import { PoliceOfficer } from '../../models/police-officer.model';

@Component({
  selector: 'app-police-detail',
  templateUrl: './police-detail.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class PoliceDetailPage implements OnInit {
  officer: PoliceOfficer | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private policeService: PoliceService,
    private alertController: AlertController
  ) {
    addIcons({ createOutline, trashOutline, folderOpenOutline, chevronForwardOutline });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.policeService.getOfficer(+id).subscribe(data => {
        this.officer = data;
      });
    }
  }

  async deleteOfficer() {
    if (!this.officer) return;

    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this officer?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Delete',
          handler: () => {
            if (this.officer) {
              this.policeService.deleteOfficer(this.officer.id).subscribe(() => {
                this.router.navigate(['/police-list']);
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
