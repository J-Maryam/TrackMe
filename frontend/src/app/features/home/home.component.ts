import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '../../shared/components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent]
})
export class HomeComponent {
  features = [
    {
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      title: 'Localisation GPS précise',
      description: 'Suivez la position en temps réel avec une précision optimale'
    },
    {
      icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
      title: 'Alertes instantanées',
      description: 'Recevez des notifications en cas de sortie de zone de sécurité'
    },
    {
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Autonomie longue durée',
      description: 'Batterie optimisée pour une utilisation continue'
    }
  ];

  steps = [
    {
      number: '1',
      title: 'Commandez',
      description: 'Sélectionnez votre bracelet et passez commande en ligne'
    },
    {
      number: '2',
      title: 'Recevez',
      description: 'Livraison rapide à domicile sous 2-3 jours ouvrés'
    },
    {
      number: '3',
      title: 'Configurez',
      description: 'Installation simple avec notre guide pas à pas'
    },
    {
      number: '4',
      title: 'Suivez',
      description: 'Accédez au tableau de bord pour le suivi en temps réel'
    }
  ];

  constructor() {}
}
