import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PoliceService } from '../../services/police.service';

@Component({
  selector: 'app-police-form',
  templateUrl: './police-form.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class PoliceFormPage implements OnInit {
  policeData: any = {
    name: '',
    badge_number: '',
    rank: '',
    department: '',
    status: 1
  };
  isEdit = false;
  id: number | null = null;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private policeService: PoliceService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.id = +id;
      this.policeService.getOfficer(this.id).subscribe(data => {
        this.policeData = data;
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  save() {
    const formData = new FormData();
    formData.append('name', this.policeData.name);
    formData.append('badge_number', this.policeData.badge_number);
    formData.append('rank', this.policeData.rank);
    formData.append('department', this.policeData.department);
    formData.append('status', this.policeData.status);
    
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    if (this.isEdit && this.id) {
      this.policeService.updateOfficer(this.id, formData).subscribe(() => {
        this.router.navigate(['/police-list']);
      });
    } else {
      this.policeService.createOfficer(formData).subscribe(() => {
        this.router.navigate(['/police-list']);
      });
    }
  }
}
