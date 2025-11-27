import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import { KillerService } from '../../services/killer.service';
import { Killer } from '../../models/killer.model';

@Component({
  selector: 'app-killer-detail',
  templateUrl: './killer-detail.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class KillerDetailPage implements OnInit {
  killer: Killer | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private killerService: KillerService,
    private alertController: AlertController
  ) {
    addIcons({ createOutline, trashOutline });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.killerService.getKiller(+id).subscribe(data => {
        this.killer = data;
      });
    }
  }

  async deleteKiller() {
    if (!this.killer) return;

    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this suspect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Delete',
          handler: () => {
            if (this.killer) {
              this.killerService.deleteKiller(this.killer.id).subscribe(() => {
                this.router.navigate(['/killer-list']);
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
