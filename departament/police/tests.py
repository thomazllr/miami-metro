from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from .models import PoliceOfficer
from .forms import PoliceOfficerForm
from .consts import RANKS, DEPARTMENTS, STATUS

class TestesViewListarPoliceOfficers(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.login(username='testuser', password='12345')
        self.url = reverse('police-list')
        PoliceOfficer.objects.create(
            name="Dexter Morgan",
            rank=7,
            department=1,
            status=1,
            badge_number="12345"
        )

    def test_listar_officers(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.context['officers']), 1)

class TestesViewCriarPoliceOfficer(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.login(username='testuser', password='12345')
        self.url = reverse('police-create')

    def test_get(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.context['form'], PoliceOfficerForm)

    def test_post_valido(self):
        data = {
            'name': 'Debra Morgan',
            'rank': 4, 
            'department': 1, 
            'status': 1, 
            'badge_number': '54321'
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(PoliceOfficer.objects.count(), 1)

class TestesViewEditarPoliceOfficer(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.login(username='testuser', password='12345')
        self.officer = PoliceOfficer.objects.create(
            name="Dexter Morgan",
            rank=7,
            department=1,
            status=1,
            badge_number="12345"
        )
        self.url = reverse('police-update', args=[self.officer.pk])

    def test_get(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.context['form'], PoliceOfficerForm)

    def test_post_valido(self):
        data = {
            'name': 'Dexter Morgan Updated',
            'rank': 7,
            'department': 1,
            'status': 2, 
            'badge_number': '12345'
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 302)
        self.officer.refresh_from_db()
        self.assertEqual(self.officer.name, 'Dexter Morgan Updated')
        self.assertEqual(self.officer.status, 2)

class TestesViewDeletarPoliceOfficer(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.login(username='testuser', password='12345')
        self.officer = PoliceOfficer.objects.create(
            name="Doakes",
            rank=3,
            department=1,
            status=1,
            badge_number="99999"
        )
        self.url = reverse('police-delete', args=[self.officer.pk])

    def test_post_delete(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(PoliceOfficer.objects.count(), 0)
