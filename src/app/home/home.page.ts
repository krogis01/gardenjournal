import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public user_zip_code: any;

  getHardinessZone() {
    const xhttp = new XMLHttpRequest();
    const zoneUrl = `https://c0bra.api.stdlib.com/zipcode-to-hardiness-zone/?zipcode=${this.user_zip_code}`;
    // const plantDatesUrl = `https://www.almanac.com/gardening/planting-calendar/zipcode/${this.user_zip_code}`;
    xhttp.open("GET", zoneUrl, true);
    xhttp.send();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        alert(`You are in hardiness zone ${JSON.parse(this.responseText)['zone']}!`);
      }
    }

    return true;
  }
}

// REGEX EXPRESSIONS FOR ALMANAC
// vegetable NAMES with links: www\.almanac\.com\/plant\/[^"]*
// 