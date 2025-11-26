from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from .models import Killer, KillerPhoto
from .consts import KILLER_STATUS


class TestesViewListarKillers(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.force_login(self.user)
        self.url = reverse('killer-list')
        Killer.objects.create(
            name="Dexter Morgan",
            nickname="Bay Harbor Butcher",
            crimes="Vigilante serial killer",
            danger_level=5,
            status=4
        )
        
    def test_listar_killers(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.context['killers']), 1)
        self.assertContains(response, "Dexter Morgan")

class TestesViewCriarKiller(TestCase): 
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.force_login(self.user)
        self.url = reverse('killer-create')

    def test_get(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        
    def test_post_valido(self):
        data = {
            'name': 'Trinity Killer',
            'nickname': 'Arthur Mitchell',
            'crimes': 'Ritualistic killings',
            'danger_level': 5,
            'status': 4
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(Killer.objects.count(), 1)
        self.assertEqual(Killer.objects.first().name, 'Trinity Killer')

class TestesViewAtualizarKiller(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.force_login(self.user)
        self.killer = Killer.objects.create(
            name="Dexter Morgan",
            nickname="Bay Harbor Butcher",
            crimes="Vigilante serial killer",
            danger_level=5,
            status=4
        )
        self.url = reverse('killer-update', args=[self.killer.pk])

    def test_get(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        
    def test_post_valido(self):
        data = {
            'name': 'Dexter Morgan Updated',
            'nickname': 'Dark Defender',
            'crimes': 'Vigilante',
            'danger_level': 4,
            'status': 3, 
            'photos-TOTAL_FORMS': '3',
            'photos-INITIAL_FORMS': '0',
            'photos-MIN_NUM_FORMS': '0',
            'photos-MAX_NUM_FORMS': '1000',
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 302)
        
        self.killer.refresh_from_db()
        self.assertEqual(self.killer.name, 'Dexter Morgan Updated')
        self.assertEqual(self.killer.status, 3)

class TestesViewDeletarKiller(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.force_login(self.user)
        self.killer = Killer.objects.create(
            name="Brian Moser",
            nickname="Ice Truck Killer",
            crimes="Prosthetics",
            danger_level=5,
            status=1 
        )
        self.url = reverse('killer-delete', args=[self.killer.pk])

    def test_get(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_post_delete(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(Killer.objects.count(), 0)
