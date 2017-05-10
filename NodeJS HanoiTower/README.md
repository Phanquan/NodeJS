# NodeJS  

## Help  
Type this to run the program:  
```
node HanoiTower.js 
```

Result  
```
Move disk 1 from TowerA to TowerC
Move disk 2 from TowerA to TowerB
Move disk 1 from TowerC to TowerB
Move disk 3 from TowerA to TowerC
Move disk 1 from TowerB to TowerA
Move disk 2 from TowerB to TowerC
Move disk 1 from TowerA to TowerC
7 moves
```

## Bài toán Tháp Hà Nội:
* Đề Bài:   
  > Cho 3 Tháp (Tower) và 3 Đĩa (Disk).Trong đó tháp 1 chứa 3 đĩa lần lượt có bán kính giảm dần từ dưới lên.  
  > Ta sẽ đặt các đĩa từ Tháp 1 tới tháp 3 sao cho các đĩa có bá kính lớn hơn luôn nằm dưới các đĩa có bán kính nhỏ hơn.
* Giải theo cách Quy nạp và Đệ quy:  
  * Với n = 1 đĩa (disk1),ta chuyển disk1 từ tháp A(towerA - tháp bắt đầu) sang tháp C(towerC - tháp đích).  
  * Với n = 2 đĩa (disk1,2),ta chuyển đĩa nhỏ(disk1) sang tháp B(towerB - tháp trung gian) rồi chuyển đĩa lớn (disk2) sang tháp C và cuối cùng chuyển đĩa nhỏ (disk 1) từ tháp B sang tháp C.  
  * Với n = n đĩa,ta chuyển disk(n-1) sang tháp B rồi chuyển disk(n) từ tháp A sang tháp C sau đó chuyển disk(n-1) từ tháp B sang tháp C,sau đó bắt đầu lại (đệ quy lại).  
