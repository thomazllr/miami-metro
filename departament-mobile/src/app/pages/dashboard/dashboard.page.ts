import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, PopoverController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  notificationsOutline, logOutOutline, folderOpenOutline, 
  checkmarkCircleOutline, alertCircleOutline, snowOutline, 
  shieldCheckmarkOutline, chevronForward, skullOutline, 
  briefcaseOutline, businessOutline 
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { DashboardService, DashboardStats } from '../../services/dashboard.service';
import { NotificationsComponent } from '../../components/notifications/notifications.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class DashboardPage implements OnInit {
  stats: DashboardStats | null = null;
  username: string = 'Officer';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private dashboardService: DashboardService,
    private popoverController: PopoverController
  ) {
    addIcons({ 
      notificationsOutline, logOutOutline, folderOpenOutline, 
      checkmarkCircleOutline, alertCircleOutline, snowOutline, 
      shieldCheckmarkOutline, chevronForward, skullOutline, 
      briefcaseOutline, businessOutline 
    });
  }

  ngOnInit() {
    this.loadStats();
    const storedUser = this.authService.getUsername();
    if (storedUser) {
      this.username = storedUser;
    }
  }

  async openNotifications(ev: any) {
    const popover = await this.popoverController.create({
      component: NotificationsComponent,
      event: ev,
      translucent: true,
      cssClass: 'notifications-popover'
    });
    await popover.present();
  }

  loadStats() {
    this.dashboardService.getStats().subscribe({
      next: (data) => this.stats = data,
      error: (err) => console.error('Error loading stats', err)
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
