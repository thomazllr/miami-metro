import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CaseService } from '../../services/case.service';

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class CaseFormPage implements OnInit {
  caseData: any = {
    case_number: '',
    title: '',
    description: '',
    status: 1,
    date_opened: new Date().toISOString().split('T')[0]
  };
  isEdit = false;
  id: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caseService: CaseService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.id = +id;
      this.caseService.getCase(this.id).subscribe(data => {
        this.caseData = data;
      });
    }
  }

  save() {
    if (this.isEdit && this.id) {
      this.caseService.updateCase(this.id, this.caseData).subscribe(() => {
        this.router.navigate(['/case-list']);
      });
    } else {
      this.caseService.createCase(this.caseData).subscribe(() => {
        this.router.navigate(['/case-list']);
      });
    }
  }
}
