import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Parking } from 'src/app/model/parking';
import { ParkingService } from 'src/app/services/parking/parking.service';

declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {

  map : any;

  @ViewChild('map', { read: ElementRef, static: false}) mapRef: ElementRef;

  constructor(
    private parkingService: ParkingService,
    private router: Router
  ) { }

  ionViewDidEnter() {
    this.showMap();
  }

  // 14.723230082625847, -17.28862357430804

  showMap() {
    // const location = new google.maps.LatLng(14.774336314048485, -16.953537832300384);
    const location = new google.maps.LatLng(14.723230082625847, -17.28862357430804);
    const options = {
      center: location,
      zoom:15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    this.parkingService.findAll().subscribe(
      response => {
        console.log(response);
        this.setMarkersToMap(response);

      }
    )
    
  }

  infoWindows = [];
  // markers:  any = [
    
  //   {
  //     title: "NAtional Art Gallery",
  //     lat: "-17.824991",
  //     long: "31.049295"
  //   },{
  //     title: "West EN Hospital",
  //     lat: "-17.820987",
  //     long: "31.039682"
  //   },
  //   {
  //     title: "Dom COnvent School",
  //     lat: "-17.822647",
  //     long: "31.039682"
  //   },
  //   {
  //     title: "Brazilian Stackhouse",
  //     lat: "-17.819460",
  //     long: "31.053844"
  //   },
  //   {
  //     title: "Canadian EMbassy",
  //     lat: "-17.820972",
  //     long: "31.043587"
  //   }
  // ];
  
  setMarkersToMap(markers) {
    for (let marker of markers) {
      let location = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: location,
        title: marker.name,
        latitude: marker.latitude,
        longitude: marker.longitude
      });
      mapMarker.setMap(this.map)
      this.showInfosToMarker(mapMarker)    ;
    }
  }

  showInfosToMarker(marker) {
    let infoWindowContent = '<div id="content">'
                  + '<h2 id="firstHeading" class="firstHeading">' + marker.title + '</h2>'
                  + '<p>Latitude: ' + marker.latitude + '</p>'
                  + '<p>Longitude: ' + marker.longitude + '</p>'
                  // + '<button> + Afficher </button>'
                  + '<button id="open" style="color:#e50" (click)="click()">Afficher<button>' 
                  + '</div>';
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });

    google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
      document.getElementById('open').addEventListener('click', () => {
        //alert('Clicked');
        // console.log("touch");
        // this.closeInfoViewWindow(infoWindow);
        // this.openEventDetailModal(event);
        this.parkingService.findByName(marker.title).subscribe(
          response => {
            console.log(response);
            this.router.navigateByUrl("/parkings/" + response.id);
          }
        )
      });
    });
    
    this.infoWindows.push(infoWindow);            
  }

  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }

  click() {
    console.log("test");
  }
}
