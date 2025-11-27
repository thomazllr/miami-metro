import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { KillerService } from '../../services/killer.service';
import { addIcons } from 'ionicons';
import { cameraOutline, closeCircle } from 'ionicons/icons';

@Component({
  selector: 'app-killer-form',
  templateUrl: './killer-form.page.html',
  styleUrls: ['./killer-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class KillerFormPage implements OnInit {
  killerData: any = {
    name: '',
    nickname: '',
    crimes: '',
    danger_level: 1,
    status: 4 // Active
  };
  isEdit = false;
  id: number | null = null;
  selectedFiles: File[] = [];
  previewImages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private killerService: KillerService
  ) {
    addIcons({ cameraOutline, closeCircle });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.id = +id;
      this.killerService.getKiller(this.id).subscribe(data => {
        this.killerData = data;
        // If editing, we might want to show existing photos, but for now let's focus on new uploads
        // Or we could populate previewImages with existing URLs if we want to support deleting them
      });
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files) as File[];
      
      // Check total limit
      if (this.selectedFiles.length + newFiles.length > 3) {
        alert('Max 3 photos allowed.');
        return;
      }

      newFiles.forEach(file => {
        this.selectedFiles.push(file);
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
      
      // Reset input so same file can be selected again if needed (though we just added it)
      event.target.value = '';
    }
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.previewImages.splice(index, 1);
  }

  save() {
    const formData = new FormData();
    formData.append('name', this.killerData.name);
    if (this.killerData.nickname) formData.append('nickname', this.killerData.nickname);
    formData.append('crimes', this.killerData.crimes);
    formData.append('danger_level', this.killerData.danger_level.toString());
    formData.append('status', this.killerData.status.toString());

    this.selectedFiles.forEach((file) => {
      formData.append('photos', file);
    });

    if (this.isEdit && this.id) {
      this.killerService.updateKiller(this.id, formData).subscribe(() => {
        this.router.navigate(['/killer-list']);
      });
    } else {
      this.killerService.createKiller(formData).subscribe(() => {
        this.router.navigate(['/killer-list']);
      });
    }
  }
}
