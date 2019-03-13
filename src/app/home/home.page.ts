import { Component } from '@angular/core';
import request = require('request-promise-native');

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public user_zip_code: any;

  sendRequest() {
    const zoneUrl = `https://c0bra.api.stdlib.com/zipcode-to-hardiness-zone/?zipcode=${this.user_zip_code}`;
    let returnedHtml = '';
    // alert(zoneUrl);

    request(zoneUrl).then(function(htmlString) {
      returnedHtml = htmlString;
    }).catch(function(err) {
      returnedHtml = 'Sorry, we could not find your zone';
    });

    alert(returnedHtml);
    return returnedHtml;
  }
}
