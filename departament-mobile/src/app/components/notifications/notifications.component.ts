import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { ellipse } from 'ionicons/icons';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class NotificationsComponent {
  notifications = [
    { title: 'New Case Assigned', message: 'Case #4421 - Homicide at Ocean Dr.', time: '10 min ago', read: false },
    { title: 'Suspect Sighted', message: 'Possible match for "The Skinner" in Downtown.', time: '1 hour ago', read: false },
    { title: 'Department Memo', message: 'Mandatory briefing at 08:00 AM tomorrow.', time: '3 hours ago', read: true },
    { title: 'Evidence Processed', message: 'Lab results for Case #4410 are ready.', time: '5 hours ago', read: true },
  ];

  constructor() {
    addIcons({ ellipse });
  }
}