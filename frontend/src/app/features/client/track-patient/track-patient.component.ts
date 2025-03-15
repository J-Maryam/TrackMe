import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-track-patient',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './track-patient.component.html',
  styleUrls: ['./track-patient.component.css'],
})
export class TrackPatientComponent implements AfterViewInit {
  map: L.Map | null = null;
  staticLocation = {
    lat: 51.505,
    lng: -0.09,
    address: 'Trafalgar Square, London, WC2N 5DN, United Kingdom',
    city: 'London',
    country: 'United Kingdom',
    patientName: 'John Doe',
  };
  expandedSections: { [key: string]: boolean } = {
    address: false,
    city: false,
    country: false,
    coordinates: false,
  };

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    if (this.map) return;

    this.map = L.map('map').setView([this.staticLocation.lat, this.staticLocation.lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    L.marker([this.staticLocation.lat, this.staticLocation.lng])
      .addTo(this.map)
      .bindPopup(`Patient: ${this.staticLocation.patientName}<br>${this.staticLocation.address}`)
      .openPopup();
  }

  toggleSection(section: string): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      alert(`Copied to clipboard: ${text}`);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  goBack(): void {
    this.router.navigate(['/assigned-bracelets']);
  }
}
