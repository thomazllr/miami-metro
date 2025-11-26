from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from datetime import date
from .models import Case
from .forms import CaseForm
from killer.models import Killer
from police.models import PoliceOfficer

class TestesViewListarCases(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.force_login(self.user)
        self.url = reverse('case-list')
        Case.objects.create(
            case_number="CASE-001",
            title="Test Case",
            description="Test Description",
            status=1,
            date_opened=date.today()
        )

    def test_listar_cases(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.context['cases']), 1)
        self.assertContains(response, "Test Case")

class TestesViewCriarCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.force_login(self.user)
        self.url = reverse('case-create')
        self.killer = Killer.objects.create(name="Killer 1", status=4)
        self.officer = PoliceOfficer.objects.create(
            name="Officer 1", 
            rank=6, 
            department=1, 
            status=1, 
            badge_number="11111"
        )

    def test_get(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.context['form'], CaseForm)

    def test_post_valido(self):
        data = {
            'case_number': 'CASE-NEW',
            'title': 'New Case',
            'description': 'New Description',
            'status': 1,
            'killer': self.killer.pk,
            'officers': [self.officer.pk],
            'date_opened': date.today()
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(Case.objects.count(), 1)
        case = Case.objects.first()
        self.assertEqual(case.title, 'New Case')
        self.assertIn(self.officer, case.officers.all())

class TestesViewDetalheCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.force_login(self.user)
        self.case = Case.objects.create(
            case_number="CASE-001",
            title="Detail Case",
            description="Desc",
            status=1,
            date_opened=date.today()
        )
        self.url = reverse('case-detail', args=[self.case.pk])

    def test_detalhe_case(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context['case'], self.case)
        self.assertContains(response, "Detail Case")

class TestesViewAtualizarCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.force_login(self.user)
        self.officer = PoliceOfficer.objects.create(
            name="Officer Update", 
            rank=6, 
            department=1, 
            status=1, 
            badge_number="22222"
        )
        self.case = Case.objects.create(
            case_number="CASE-UPDATE",
            title="Old Title",
            description="Old Desc",
            status=1,
            date_opened=date.today()
        )
        self.case.officers.add(self.officer)
        self.url = reverse('case-update', args=[self.case.pk])

    def test_get(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_post_valido(self):
        data = {
            'case_number': 'CASE-UPDATE',
            'title': 'Updated Title',
            'description': 'Updated Desc',
            'status': 2, 
            'date_opened': date.today(),
            'date_closed': date.today(),
            'officers': [self.officer.pk]
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 302)
        self.case.refresh_from_db()
        self.assertEqual(self.case.title, 'Updated Title')
        self.assertEqual(self.case.status, 2)

class TestesViewDeletarCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.force_login(self.user)
        self.case = Case.objects.create(
            case_number="CASE-DELETE",
            title="Delete Me",
            description="Desc",
            status=1,
            date_opened=date.today()
        )
        self.url = reverse('case-delete', args=[self.case.pk])

    def test_get(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_post_delete(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(Case.objects.count(), 0)
