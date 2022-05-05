import { Component, OnInit } from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import { TaqueriasService } from './taquerias.service';
import { Taquerias } from './taquerias';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MAPAS_EJEMPLO';
  zoom = 12
  center!: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  markers: any[] = [];

  taquerias!: Taquerias[];

  constructor(private taqueriasService: TaqueriasService) {}


  getTaquerias(): void {
    this.taqueriasService.getTaquerias().subscribe(taquerias => this.taquerias = taquerias);
    console.log(this.taquerias);
  }
  getTaqueria():void{

  }
  updateTaqueria():void{

  }
  deleteTaqueria():void{

  }
  addTaqueria():void{

  }



  ngOnInit(): void {
    this.center = {
      lat: 32.638111,
      lng: -115.475548,
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
    this.getTaquerias();
  }
  click(event: google.maps.MapMouseEvent) {
    this.addMarker();
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom!) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom!) this.zoom--
  }
  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    })

  }

}

export class TablaDeDatos{
  displayColumns: string[] = ['Nombre','Calidad','Precio','Comentario','Pagina facebook'];
  dataSource = taquerias;
}


