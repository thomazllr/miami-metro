import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import { CaseService } from '../../services/case.service';
import { Case } from '../../models/case.model';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class CaseDetailPage implements OnInit {
  case: Case | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caseService: CaseService,
    private alertController: AlertController
  ) {
    addIcons({ createOutline, trashOutline });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.caseService.getCase(+id).subscribe(data => {
        this.case = data;
      });
    }
  }

  async deleteCase() {
    if (!this.case) return;

    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this case?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Delete',
          handler: () => {
            if (this.case) {
              this.caseService.deleteCase(this.case.id).subscribe(() => {
                this.router.navigate(['/case-list']);
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
