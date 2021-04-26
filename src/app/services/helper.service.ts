import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  categories: Array<string> = [
    'חדשות',
    'ספורט',
    'כלכלה',
    'בריאות',
    'תרבות',
    'ביטחון',
    'כלכלה',
    'פוליטיקה',
    'קורונה',
  ];

  conc(array: Array<any>, addArray: any = false) {
    if (array == undefined || array == null)
      return console.error('Cannot set undefined or null data');
    for (let i = 0; i < array.length; i++) {
      let date: any = new Date(array[i].pubDate[0]);
      if (isNaN(date)) {
        array[i].pubDate[0] = this.replaceDate(array[i].pubDate[0]);
      }
      array[i]['id'] = new Date(array[i].pubDate[0]).getTime();
      if (array[i]['media:content']) {
        array[i].media = array[i]['media:content'][0]['$'];
      }
      if (array[i].enclosure) {
        array[i].media = array[i].enclosure[0].$;
      }
      if (array[i].image624X383) {
        array[i].media = array[i].image624X383[0];
      }
      if (array[i].image) {
        array[i].media = array[i].image[0];
      }
      if (array[i].comments) {
        array[i].cleanUrl = array[i].comments[0]
          .split('/')[2]
          .split('.')
          .splice(1)
          .join('.');
        if (array[i].cleanUrl == 'co.il') {
          array[i].cleanUrl = array[i].comments[0]
            .split('/')[2]
            .split('.')
            .splice(0)
            .join('.');
        }
      } else {
        array[i].cleanUrl = array[i].link[0]
          .split('/')[2]
          .split('.')
          .splice(1)
          .join('.');
      }
      if (!array[i].description[0].div) {
        if (array[i].description[0] && array[i].description[0] != '') {
          if (array[i].cleanUrl == 'maariv.co.il') {
            array[i].media = array[i].description[0].split("'")[7];
          }
          if (array[i].cleanUrl == 'one.co.il') {
            array[i].media = array[i].description[0].split('"')[1];
          }
          if (array[i].cleanUrl == '20il.co.il') {
            if (array[i]['content:encoded']) {
              array[i].media = this.extractImg(
                array[i]['content:encoded'][0].split('"')
              );
              if (array[i].media != undefined)
                array[i].media = array[i].media.split(' ')[0];
            }
          }
          if (array[i].cleanUrl == 'news1.co.il') {
            if (array[i]['description']) {
              array[i].media = this.extractImg(
                array[i]['description'][0].split('"')[0].split("'")
              );
              if (array[i].media != undefined)
                array[i].media = array[i].media.split(' ')[0];
            }
          }
          array[i].AllDescription = array[i].description[0].replace(
            /(<([^>]+)>)/gi,
            ''
          );
          array[i].description = array[i].description[0]
            .replace(/(<([^>]+)>)/gi, '')
            .substring(0, 100);
        } else if (array[i]['content:encoded']) {
          array[i].AllDescription = array[i]['content:encoded'][0].replace(
            /(<([^>]+)>)/gi,
            ''
          );
          array[i].description = array[i]['content:encoded'][0]
            .replace(/(<([^>]+)>)/gi, '')
            .substring(0, 100);
        }
      } else {
        array[i].AllDescription = array[
          i
        ].description[0].div[0].div[0].div[0]._.replace(/(<([^>]+)>)/gi, '');
        array[i].description = array[
          i
        ].description[0].div[0].div[0].div[0]._.replace(
          /(<([^>]+)>)/gi,
          ''
        ).substring(0, 100);
      }
      if (array[i].cleanUrl == 'bizportal.co.il') {
        array[i].title = array[i].title[0].replace(/(<([^>]+)>)/gi, '');
        array[i].AllDescription = array[i].AllDescription.replace(
          /(<([^>]+)>)/gi,
          ''
        );
      }
      if (addArray) addArray.push(array[i]);
    }

    this.tagsMaker(this.categories, array);

    if (addArray) return addArray;
    return array;
  }

  replaceDate(date: any) {
    if (!date) return 'Date not provided';
    date = date.split(' ');
    for (let i = 0; i < date.length; i++) {
      if (date[i] == 'ז,') date[i] = ' Sat ';
      if (date[i] == 'ו,') date[i] = ' Fri ';
      if (date[i] == 'ה,') date[i] = ' Thu ';
      if (date[i] == 'ד,') date[i] = ' Wed ';
      if (date[i] == 'ג,') date[i] = ' Tue ';
      if (date[i] == 'א,') date[i] = ' Sun ';
      if (date[i] == 'ב,') date[i] = ' Mon ';
      if (date[i] == 'ינו') date[i] = ' Jan ';
      if (date[i] == 'פבר') date[i] = ' Feb ';
      if (date[i] == 'מרץ') date[i] = ' Mar ';
      if (date[i] == 'אפר') date[i] = ' Apr ';
      if (date[i] == 'מאי') date[i] = ' May ';
      if (date[i] == 'יונ') date[i] = ' Jun ';
      if (date[i] == 'יול') date[i] = ' Jul ';
      if (date[i] == 'אוג') date[i] = ' Aug ';
      if (date[i] == 'ספט') date[i] = ' Sep ';
      if (date[i] == 'אוק') date[i] = ' Oct ';
      if (date[i] == 'נוב') date[i] = ' Nov ';
      if (date[i] == 'דצמ') date[i] = ' Dec ';
    }
    if (!isNaN(date)) {
      console.log(date);
      return new Date(date.join(' ')).toString();
    } else {
      date = date[0].split('/');
      date = new Date(date[0], date[1], date[2]).toString();
      return date;
    }
  }

  extractImg(array: any) {
    let img;
    array.forEach(function (str: any) {
      if (
        str.includes('png') ||
        str.includes('jpeg') ||
        str.includes('jpg') ||
        str.includes('player')
      ) {
        img = str;
      }
    });
    return img;
  }

  tagsMaker(categories: Array<string>, data: Array<any>) {
    let array: Array<any> = [];
    categories.forEach(function (category: any) {
      data.forEach(function (item: any) {
        if (item.AllDescription) {
          item.AllDescription.split(' ').forEach(function (w: any) {
            if (w == category) array.push(category);
          });
        }
        if (item.title) {
          item.title[0].split(' ').forEach(function (w: any) {
            if (w.includes(category)) array.push(category);
          });
        }
        if (item.category) {
          item.category.forEach(function (w: any) {
            if (w == category) array.push(category);
          });
        }
        if (item['dc:creator']) {
          item['dc:creator'].forEach(function (w: any) {
            if (w == category) array.push(category);
          });
        }
        let newArray = [...new Set(array)];
        item.categories = newArray;
      });
    });
  }
}
