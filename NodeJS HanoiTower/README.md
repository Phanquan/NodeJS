# Mô hình hóa thuật toán Tháp Hà Nội (Hanoi Towers) bằng D3JS - Hướng đối tượng


## Phân tích bài toán theo Logic  
#### Sử dụng thuật toán Đệ Quy để giải quyết bài toán:  
```javascript
var hanoi = function(disc,src,aux,dest){
  if(disc > 0){
    hanoi(disc -1,src,dest,aux);
    console.log('Move disc '+disc+' from '+src+' to '+dest);
    hanoi(disc -1,aux,src,dest);
  }
};
hanoi(3,'src','aux','dest');
```
#### Trong đó:    
* src,aux,dest là các Tháp tương ứng: Tháp gốc (src),Tháp trung gian(aux) và Tháp Đích.
* disk là tham số dạng Number tương ứng số đĩa truyền vào.
#### Cách giải  
* Chuyển n-1 đĩa từ cọc A sang B. Chỉ còn đĩa n trên cọc A.  
* Chuyển đĩa n từ cọc A sang cọc C.  
* Chuyển n-1 đĩa từ B sang C cho các đĩa có đường kính nhỏ hơn lần lượt nằm trên đĩa n.  
* Tiến hành bước 1 và 3, áp dụng lại thuật giải cho n-1.  

## Các Bước xây dựng:
### Bước 1: Vẽ svg Tổng và tính toán tọa độ các cọc,đĩa  

* Sử dụng thư viện d3js để vẽ svg:  

``` javascript
let svg = d3.select(".container")
			.append("svg")
			.attr("width", $(".container").width())
			.attr("height", disks_input*40+300); 
			//với n là số đĩa đưa vào ở sau,40 là chiều cao từng đĩa.
```

* Tính toán tọa độ,khoảng cách giữa các cọc,đĩa:
	> - Đầu tiên,ta chia svg ra làm 4 phần theo chiều dọc,tức là width/4  
	> - Rồi chia tiếp mỗi phần đó làm đôi theo chiều dọc,tức là width/8  
	> - Ta sẽ thấy từ hình dưới,ta tạo được 3 đĩa có bán kính bằng nhau và cách nhau 1 khoảng bằng w/8 và mỗi đĩa có bán kính bằng w/4,khoảng margin(m) giữa các đĩa bằng w/8

```javascript
	|	T1	|	⃓      T2	⃓	|	T3	|
	|	⃓	|	⃓	|	⃓	|	⃓	|
	|	⃓	|	⃓	|	⃓	|	⃓	|
	|	⃓	|	⃓	|	⃓	|	⃓	|
	|	⃓	|	⃓	|	⃓	|	⃓	|
	| _____________	|	⃓ _____________	⃓	| _____________	|
	|(_____________)|   m	*(_____________)⃓   m	|(_____________)|
	|	⃓	|	⃓	|	⃓	|	⃓	|
	

			---w/8---		---w/8---		
	-------w/4------- 	-------w/4------- 	-------w/4-------
	------------------------------width------------------------------

```
	> - Ta định nghĩa các thuộc tính của đĩa và cọc:
```javascript
	//đĩa ở cuối sẽ có bán kính lớn nhất nên ta đặt nó bằng w/4
	let biggest_disk = $(".container").width()/4; 

	// đây là vị trí tower2 với dấu '*' trên hình -> tower1 có x=0,tower3 có x=2*margin
	let margin = biggest_disk + biggest_disk/2;

	// đây là chiều rộng của đĩa nhỏ nhất
	let unit_disk = biggest_disk/disks_input;

```





* Gọi `function` thực hiện chức năng chuyển đĩa (Code xử lý chính phía trên)
``` javascript
	move(n, 0, margin, 2*margin)
```

## Cách chạy chương trình

* Copy file `html` ở đường dẫn: https://github.com/huydau91/nodejs/blob/master/hanoitower/index.html
* Mở file bằng Sublime Text hoặc các chương trình tương tự
* Thay đổi n trong `function(n, 0, margin, 2*margin)` để thay đổi số lượng các tầng
* Mở file html để xem kết quả

## Kết quả
![alt text](https://github.com/huydau91/nodejs/blob/master/hanoitower/kq.png)