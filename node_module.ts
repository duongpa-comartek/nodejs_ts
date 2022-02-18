import * as _ from 'lodash';
import { BigNumber } from 'bignumber.js';
import memoizee from 'memoizee';
import moment from 'moment';
import timezone from 'moment-timezone';

/**
 * =========================Lodash=========================
 * Là một thư viện JavaScript mạnh mẽ dùng để xử lý Array, Object, Function, Collection ...
 */

/**
 * _.chunk(arr, size): chia một mảng thành các mảng con
 * với mỗi mảng con có số phần tử là size, phần tử cuối là số phần tử còn lại <= size
 */
const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrChunk = _.chunk(arr, 3);
console.log('arr', arr);
console.log('chunk', arrChunk);

/**
 * _.join(arr, '...'): chuyển mảng sang string với mỗi phần tử được ngăn cách bởi ký tự mình nhập
 */
const arrJoin = _.join(arr, '_');
console.log('join', arrJoin);

/**
 * _.fill(arr, value, start, end): ghi đè các phần tử của mảng từ vị trí đầu -> cuối bằng một giá trị mới
 * nếu chỉ có v.trí đầu thì sẽ ghi đè đến hết
 * nếu không có chỉ số nào thì sẽ shi đè hết cả mảng
 * ghi đè vào chính mảng đang làm việc
 */
console.log(arr);
_.fill(arr, 0, 7, 8);
console.log('fill', arr);

/**
 * _.findIndex(arr, điều kiện, vị trí bắt đầu tìm): 
 * tìm trong mảng vị trí đầu tiên với điều kiện đã cho, bắt đầu tìm kiếm từ vị trí đã cho
 * nếu không có vị trí đầu thì tìm bắt đầu từ đầu mảng
 */
const userFind: { user: string, active: boolean }[] = [
    { 'user': 'barney', 'active': false },
    { 'user': 'fred', 'active': false },
    { 'user': 'pebbles', 'active': true },
    { 'user': 'barney', 'active': true },
];
const indexFind = _.findIndex(userFind, function (o) { return o.user == 'barney'; }, 2);
console.log('findIndex', indexFind); //3

/**
 * _.drop(array, n): tạo một mảng mới là mảng đang làm việc cắt đi n phần tử từ vị trí đầu
 */
const userDropped = _.drop(userFind, 3);
console.log('drop', userDropped); // [{ 'user': 'barney', 'active': true }]

/**
 * _.filter(arr, điều kiện): Lặp qua tất cả các phần tử trong mảng, tìm phần tử với điều kiện xác định.
 *  Và trả về phần tử tìm được nếu có. 
 */
const userFilter = _.filter(userFind, (e) => !e.active);
console.log('filter', userFilter);

/**
 * _.sortBy(arr, điều kiện): sắp xếp theo điều kiện
 */
const userSort: { user: string, age: number }[] = [
    { 'user': 'fred', 'age': 48 },
    { 'user': 'barney', 'age': 36 },
    { 'user': 'fred', 'age': 40 },
    { 'user': 'barney', 'age': 34 }
];
const userSortBy = _.sortBy(userSort, function (o) { return o.user; }); // [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
console.log('sortby', userSortBy);

/**
 * _.includes(arr, value, from) Kiểm tra xem các giá trị ta truyền vào có nằm trong arr. 
 * Nếu có trả về true và ngược lại. 
 * Kiểm tra từ vị trí from
 */
const us = userSort[1]
console.log('includes', _.includes(userSort, us));

/**
 * _.compact(array): lọc các giá trị falsey: false, null, 0, "", undefined, NaN
 * loại bỏ các giá trị trên khỏi mảng, nó làm việc luôn trên mảng 
 */
const arrNumber = [1, 0, 3, 4, 5, false, 7, ""];
const arrCompact = _.compact(arrNumber);
console.log('compact: ' + arrCompact);

/**
 * _.concat(arr, [một mảng]): nối mảng vào cuối arr để tạo ra một mảng mới
 */
const arrConcat = _.concat(arr, arrCompact);
console.log('concat: ' + arrConcat);

/** 
 * _.first(array): lấy phần tử đầu tiên của mảng
*/
const firstNumber = _.first(arrConcat);
console.log('first: ', firstNumber);

/**
 * _.difference(array, [values]): loại bỏ các giá trị trong array bằng một phần tử của values
 */
const array = ["a", 2, 3, 3, 2, 2, 3, 4, 6, 5, 4, 3, 1, 2];
const values = [2, 3]
const arrDifference = _.difference(array, values);
console.log("Before: ", array);
console.log("After: ", arrDifference);

/**
 * =========================BigNumber.js=========================
 * Thư viện JavaScript dành cho số học có độ chính xác tùy ý.
 * s: +1 hoặc -1 biểu thị số âm hoặc dương
 * e: số mũ: là 1e?? hay là số thuộc 10^? 
 * c: giá trị của số ở cơ số 10
 */
const number = new BigNumber(123124.12231);
console.log('number', number.toFormat(4));
console.log(new BigNumber(1, 2))
new BigNumber(9, 2) // 'NaN'

// isBigNumber: kiểm tra có phải một trường hợp BigNumber
const number2 = 1;
console.log(BigNumber.isBigNumber(number2)); // false
console.log(number instanceof BigNumber); // true
console.log(BigNumber.isBigNumber(number)); // true

//maximum và minimum: trả về đỗi số lớn nhất và nhỏ nhất 
const numberMax = BigNumber.maximum(4e9, number, '123456789.9');
const numberMin = BigNumber.minimum(4e9, number, '123456789.9');
console.log('max:', numberMax, 'min: ', numberMin); //max: BigNumber { s: 1, e: 9, c: [ 4000000000 ] } min:  BigNumber { s: 1, e: 5, c: [ 123124, 12231000000000 ]

//sum: tính tổng các số trong array
const sumNumber = BigNumber.sum(4e9, number, '123456789.9');
console.log('sum: ', sumNumber.toNumber());

/**
 * =========================Memoizee=========================
*/
function add(a: number, b: number) {
    return a + b;
}
const memoizeeAdd = memoizee(add, { length: 2 });

// gọi add() - kết quả mới nhất: 3 - Init – Initial hits
console.log('memoizee', memoizeeAdd(1, 2));

// không gọi add() - kết quả được lưu trong bộ nhớ đệm và trả về: 3 - Cache – Cache hits
console.log(memoizeeAdd(1, 2));

// gọi add() - kết quả mới nhất: 5 - Init – Initial hits
console.log(memoizeeAdd(3, 2));

// không gọi add() - kết quả được lưu trong bộ nhớ đệm và trả về: 5 -Cache – Cache hits
console.log(memoizeeAdd(3, 2));

// gọi add() - kết quả mới nhất: 3 - Init – Initial hits
console.log(memoizeeAdd(1, 2));

// Trong khi kết quả của add (1, 2) đã được lưu vào bộ nhớ đệm trước đó
// (1, 2) không phải là đối số mới nhất, lần gọi cuối cùng là (2, 3)
// vì vậy kết quả được lưu trong bộ nhớ đệm trước đó của (1, 2) đã bị mất

// memProfile.statistics; // Statistics accessible for programmatic use
// console.log(memProfile.log()); // Output statistics data in readable form

/**
 * =========================Moment=========================
 * là một thư viện mạnh dùng để thao tác xử lý datetime trong javascript.
 */

// moment(): lấy thời gian hiện tại
const now = moment();
moment.locale('en');// đổi đơn vị ngôn ngữ 
console.log('moment', now);
console.log(moment(now).fromNow());//so sánh times theo năm
console.log(moment().add(7, 'hour'));                        //moment().add(): thêm
console.log(moment().subtract(7, 'days'));                   //moment().subtract(): lùi thời gian
moment("2012-02", "YYYY-MM").daysInMonth();                  //daysInMonth() : Get số ngày trong tháng hiện tại
console.log("date", moment().format('DD/MMM/YYYY/HH:mm'));   //format(): Định dạng time
console.log("quarters", moment().add(2, 'month').quarters());//quarters(): chia 12 tháng có 4 quarters:1(đầu tháng 1 đến cuối tháng 3)...
console.log("unix", moment.unix(2));
console.log(moment.utc().format());                          //utc(): giờ theo utc

/**
 * =========================Moment-tz=========================
 * Moment timezone là một tiện ích bổ sung cho Moment.js.
 * Có thể làm việc với các múi giờ khác nhau.
 * h: giờ
 * a: a.m, p.m
 * z: timezone
 * America/Los_Angeles: châu lục/thành phố
*/
const jun = timezone("2014-06-01T12:00:00Z");
const dec = timezone("2014-12-01T12:00:00Z");

console.log(jun.tz('America/Los_Angeles').format('ha z'))
console.log(dec.tz('America/Los_Angeles').format('ha z'))// 4am PST
console.log(jun.tz('America/New_York').format('ha z')) // 8am EDT
console.log(dec.tz('America/New_York').format('ha z')) // 7am EST
console.log(jun.tz('Asia/Tokyo').format('ha z')) // 9pm JST
console.log(dec.tz('Asia/Tokyo').format('ha z')) // 9pm JST
console.log(jun.tz('Australia/Sydney').format('ha z')) // 10pm EST
console.log(dec.tz('Australia/Sydney').format('ha z')) // 11pm EST

const newYork = moment.tz("2014-06-01 12:00", "America/New_York");
const losAngeles = newYork.clone().tz("America/Los_Angeles");
const london = newYork.clone().tz("Europe/London");

console.log(newYork.format()); // 2014-06-01T12:00:00-04:00
console.log(losAngeles.format()); // 2014-06-01T09:00:00-07:00
console.log(london.format()); // 2014-06-01T17:00:00+01:00

/**
 * =========================Timestamp=========================
 * Timestamp là số mili giây tính từ ngày 1 tháng 1 năm 1970 UTC
 * Tính với gmt = 0
 * Tại một thời điểm xác định chỉ có 1 timestamp với mọi nơi
*/

const time = new Date();
console.log(time.getTime());

const dateNow = moment.unix(0);
moment.locale('en');
console.log("unix", dateNow.utc());

//Method to format Date: YYYY-MM(MMM-MMMM)-DD-HH-mm
//Có thể truyền tối đa 7 đối số vào hàm để tạo ra ngày/giờ :
// + Year: 4 ký tự năm
// + Month: (0-11). Month là zero-indexed, MM - tháng theo số, MMM - tháng viết tắt, MMMM-tên đầy đủ
// + Day
// + Hour
// + Minutes
// + Seconds
// + Milliseconds

//Comparing dates
//Example : 
const earlier = new Date(2019 - 3 - 26)// Khai báo ngày tháng sử dụng datestring
const later = new Date(2019 - 3 - 26)
console.log(earlier < later)//So sanh lon hon // true

const isSameTime = (earlier: any, later: any) => earlier.getTime() === later.getTime()
console.log(isSameTime(earlier, later))//So sanh bang //false

const failDay = new Date(2022, 3, 32)
console.log(failDay.toLocaleDateString())

const dayStamp = new Date(1645000000000)// Sử dụng timestamp để khởi tạo ngày tháng.
console.log(dayStamp.toDateString())//16/02/2022
