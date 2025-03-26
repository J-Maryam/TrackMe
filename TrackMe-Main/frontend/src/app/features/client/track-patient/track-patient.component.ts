import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import * as L from 'leaflet';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-track-patient',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './track-patient.component.html',
  styleUrls: ['./track-patient.component.css']
})
export class TrackPatientComponent implements OnInit, AfterViewInit, OnDestroy {
  map: L.Map | null = null;
  braceletId: string = '';
  patientLocation: any = null;
  stompClient: any;
  showCopyNotification = false;

  // Ces propriétés sont nécessaires pour le template
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
  locationDetails: {
    address: string;
    city: string;
    country: string;
  } | null = null;

  isLoading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    // Configuration des icônes Leaflet
    const defaultIcon = L.icon({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    L.Marker.prototype.options.icon = defaultIcon;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.braceletId = params['patientId'];
      console.log("Patient ID:", this.braceletId);

      if (this.braceletId) {
        this.loadBraceletLocation();
        this.connectWebSocket();
      } else {
        console.error("No patient ID provided");
      }
    });
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  ngOnDestroy(): void {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }

  toggleSection(section: string): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.showCopyNotification = true;
      setTimeout(() => {
        this.showCopyNotification = false;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  goBack(): void {
    this.router.navigate(['/assigned-bracelets']);
  }

  private loadBraceletLocation() {
    this.http.get(`http://localhost:8080/api/bracelets/${this.braceletId}/location`)
      .subscribe(
        (data: any) => {
          this.patientLocation = data;
          this.updateMap();
        },
        error => console.error('Error fetching location data:', error)
      );
  }

  private connectWebSocket() {
    const socket = new WebSocket('ws://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/location', (message: any) => {
        const locationData = JSON.parse(message.body);
        if (locationData.deviceId === this.braceletId) {
          this.patientLocation = locationData;
          this.updateMap();
        }
      });
    });
  }
  private lastGeocodingTime = 0;
  private geocodingInterval = 10000; // 10 secondes entre les requêtes

  private updateLocationDetails(lat: number, lng: number) {
    this.isLoading = true;
    this.http.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .subscribe({
        next: (data: any) => {
          this.locationDetails = {
            address: data.display_name,
            city: data.address.city || data.address.town || data.address.village || 'N/A',
            country: data.address.country || 'N/A'
          };
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error getting location details:', err);
          this.locationDetails = {
            address: 'Address not available',
            city: 'City not available',
            country: 'Country not available'
          };
          this.isLoading = false;
        }
      });
  }

  private updateMap() {
    if (!this.patientLocation || !this.patientLocation.location) return;

    const lat = this.patientLocation.location.latitude;
    const lng = this.patientLocation.location.longitude;

    // Mettre à jour les détails de localisation
    this.updateLocationDetails(lat, lng);

    if (!this.map) {
      this.initializeMap();
    } else {
      // Update marker position
      this.updateMarkerPosition(lat, lng);
    }
  }

  private initializeMap() {
    const lat = this.staticLocation.lat;
    const lng = this.staticLocation.lng;

    this.map = L.map('map').setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup(`Patient: ${this.staticLocation.patientName}<br>${this.staticLocation.address}`)
      .openPopup();
  }

  private updateMarkerPosition(lat: number, lng: number) {
    if (!this.map) return;

    // Clear existing markers
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        this.map?.removeLayer(layer);
      }
    });

    // Add new marker
    L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup(`Patient location`)
      .openPopup();

    // Center map on new position
    this.map.setView([lat, lng], this.map.getZoom());
  }
}
