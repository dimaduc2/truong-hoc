import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col, Tab, Button, Image, Tabs, Sonnet, Form} from 'react-bootstrap';

function HocSinh({mauSang}) {
  const [hopLoi, suaHopLoi] = useState(null);
  const [coKetQuaChua, suaCoKetQuaChua] = useState(false);
  const [items, setItems] = useState([]);

  const [anh1HS, suaAnh1HS] = useState(null);
  const [ten1HS, suaTen1HS] = useState(null);
  const [gioiTinh1HS, suaGioiTinh1HS] = useState(null);
  const [tenTab, suaTenTab] = useState('All');
  const [HSTab, suaHSTab] = useState([]);
  
  const chonTen = (tenHocSinh, gioiTinh, anhHocSinh, id, tenLop, GVChuNhiem, phuHuynh, emailPH, soDienThoai, ngaySinh, tuoiHS
    ) => {
    suaTen1HS(tenHocSinh)
    suaGioiTinh1HS(gioiTinh)
    suaAnh1HS(anhHocSinh)

    suaVietTen(tenHocSinh)
    var timThayRoi = false
    for(var i=0; i<HSTab.length; i++){
      // if(HSTab[i].ten===tenHocSinh){
      // Kiểm tra xem học sinh này đã hiện ra trong Tab chưa?
      console.log('Array học sinh Tab: ', HSTab)
      if(HSTab[i].id===id){
          // alert('Có ' + tenHocSinh)
        suaTenTab(i)
        timThayRoi = true
        break;
      }
    }
    if(timThayRoi){
      alert('Có nó rồi, không thêm nữa')
    }else{
      axios.get('http://localhost:5500/HocSinh/thongTinTietHoc1HS?id='+id)
      .then(res => {
        var tong = 0
        for(var i=0;i<res.data.danhSachTH1HS.length;i++){
        

          tong+=res.data.danhSachTH1HS[i].diemTong


        }
        
        console.log('Tiết học của học sinh nào: ', res.data.danhSachTH1HS)
        HSTab.push({ten: tenHocSinh, gioiTinh: gioiTinh, anhHS: anhHocSinh, tietHoc: res.data.danhSachTH1HS, id: id, tenLop: tenLop, 
          GVChuNhiem: GVChuNhiem, phuHuynh: phuHuynh, emailPH: emailPH, soDienThoai: soDienThoai, ngaySinh:ngaySinh, 
          tongCacBai: tong, DiemTrungBinh: res.data.DiemTrungBinh, ketQuaTrungBinh: res.data.ketQuaTrungBinh, tuoiHS: tuoiHS
        })
        suaHSTab(HSTab)
        suaTenTab(HSTab.length-1)
      })
    }
  }

  
  

  const dongTab = (viTriTab) =>{
    // alert(diaChiTab)
    alert('Đã xóa')
    HSTab.splice(viTriTab, 1);
    suaHSTab(HSTab)
  }

  const [vietTen, suaVietTen] = useState(null);
  const timTen = (tenDaViet) => {
    //var timThayRoi = false
    var toGiay = "Chưa tìm thấy"
    for(var i = 0; i < cauTraLoiServer.length; i++){
      if(cauTraLoiServer[i].tenHocSinh.toUpperCase()===tenDaViet.toUpperCase()){
        alert('Tìm thấy rồi')
        chonTen(cauTraLoiServer[i].tenHocSinh, cauTraLoiServer[i].gioiTinh, cauTraLoiServer[i].anh, cauTraLoiServer[i].id, 
          cauTraLoiServer[i].GVChuNhiem, cauTraLoiServer[i].phuHuynh, cauTraLoiServer[i].emailPH, cauTraLoiServer[i].soDienThoai, 
          cauTraLoiServer[i].ngaySinh, cauTraLoiServer[i].tuoiHS
          
          )
        //timThayRoi = true
        toGiay = "Đã tìm thấy rồi"
        break;
      }
    }
    //if(timThayRoi === false){
    if(toGiay === "Chưa tìm thấy"){ 
      alert('Không có học sinh '+tenDaViet+' này' )
      suaTen1HS(null)
    }
  }

  const [cauTraLoiServer, suaCauTraLoiServer] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5500/HocSinh/')
    .then(res => {
      // alert(res.data)
      suaCauTraLoiServer(res.data.danhSachHS);
    })
    .then(
      (result) => {
        suaCoKetQuaChua(true);
        setItems(result);
      },
      (error) => {
        suaCoKetQuaChua(true);
        suaHopLoi(error);
      }
    )
  },[]);
  

  return (
    <div>
      <br/>
      <Form.Control onChange={(event) => suaVietTen(event.target.value)} value={vietTen} />
      <Button onClick={() => timTen(vietTen)}>Tìm tên</Button>
      <br/>
      <Tabs
        activeKey={tenTab}
        onSelect={(tabKhac) => suaTenTab(tabKhac)}
        className="mb-3"
        fill
      >
        <Tab eventKey="All" title="All">
          {hopLoi
            ?<div>Error: Không kết nối với Server ({hopLoi.message})</div>
            :<Table style={{color: mauSang ?'white' :'black'}} striped={mauSang ?false :true} bordered>
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Giới Tính</th>
                  <th>Lớp</th>
                </tr>
              </thead>
              <tbody>
                {cauTraLoiServer.map((moiNguoi, index)=>
                  <tr>
                    <td><a href='#' onClick={() => chonTen(moiNguoi.tenHocSinh, moiNguoi.gioiTinh, moiNguoi.anh, moiNguoi.id, moiNguoi.tenLop,
                      moiNguoi.GVChuNhiem, moiNguoi.phuHuynh, moiNguoi.emailPH, moiNguoi.soDienThoai, moiNguoi.ngaySinh, moiNguoi.tuoiHS
                      )}>
                      {moiNguoi.tenHocSinh}</a></td>
                    <td>{(moiNguoi.gioiTinh===1?'Male':'Female')}</td>
                    <td>{moiNguoi.tenLop}</td>
                  </tr>
                )}
              </tbody>
            </Table>
            // <div>{cauTraLoiServer.map((moiNguoi, index)=>
            //     <div>
            //       {'Tên: '+moiNguoi.tenHocSinh+ ' (Giới Tính: '+(moiNguoi.gioiTinh===1?'Male':'Female')+') | Lớp: '+moiNguoi.tenLop}
            //     </div>
            // )}</div>
          }
        </Tab>
        
        {/* <Tab eventKey={HSTab} title={HSTab} >{HSTab}</Tab> */}
        
        {HSTab.map((moiTabHS, index)=>
          <Tab eventKey={index} title={ <span> {moiTabHS.ten} <b onClick={()=>dongTab(index)}>x</b> </span> }>
            <Container>
              <Row>
                <Col>
                  <Image src={moiTabHS.anhHS} width="200"/>
                </Col>
                <Col>
                  Tên: {moiTabHS.ten}
                  <br/>
                  Giới tính: {moiTabHS.gioiTinh}
                  <br/>
                  Lớp: {moiTabHS.tenLop}
                  <br/>
                  Tuổi: {moiTabHS.tuoiHS}
                  <br/>
                  Giáo viên Chủ Nhiệm: {moiTabHS.GVChuNhiem}
                  <br/>
                  Phụ Huynh: {moiTabHS.phuHuynh}
                  <br/>
                  Email Phụ Huynh: {moiTabHS.emailPH}
                  <br/>
                  Số Điện Thoại: {moiTabHS.soDienThoai}
                  <br/>
                  Ngày Sinh: {moiTabHS.ngaySinh
                  ?moiTabHS.ngaySinh.slice(0,10)
                  :null
                  }
                </Col>
              </Row>
              <Row>
                <Table style={{color: mauSang ?'white' :'black'}} striped={mauSang ?false :true} bordered>
                  <thead>
                    <tr>
                      <th>Tiết học</th>
                      <th>Điểm 1</th>
                      <th>Điểm 2</th>
                      <th>Điểm tổng</th>
                      <th>Kết quả điểm</th>
                      <th>Nhận xét</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moiTabHS.tietHoc.map((moiTH, index)=>
                      <tr>
                        <td>{moiTH.TenTietHoc}</td>
                        <td>{moiTH.diem_1}</td>
                        <td>{moiTH.diem_2}</td>
                        <td>{moiTH.diemTong}</td>
                        <td>{moiTH.ketQuaDiem}</td>


                        {/* <td>
                          {80<=moiTH.diemTong && moiTH.diemTong<=100 ?'A' :''}
                          {70<=moiTH.diemTong && moiTH.diemTong<=79 ?'B' :''}
                          {50<=moiTH.diemTong && moiTH.diemTong<=69 ?'C' :''}
                          {40<=moiTH.diemTong && moiTH.diemTong<=49 ?'D' :''}
                          {0<=moiTH.diemTong && moiTH.diemTong<=39 ?'F' :''}
                        </td> */}
                        <td>{moiTH.nhanXet}</td>
                      </tr>
                    )}
                    {/* Điểm trung bình: {moiTabHS.tongCacBai/moiTabHS.tietHoc.length} */}
                    Điểm trung bình: {moiTabHS.DiemTrungBinh}<br/>Kết quả trung bình: {moiTabHS.ketQuaTrungBinh}
                  </tbody>
                </Table>
              </Row>
            </Container>
          </Tab>
        )}
        
      </Tabs>
      
      {!coKetQuaChua
        ?<div>Loading...</div>
        :null
      }
    </div>
  );

  // if (hopLoi) {
  //   return <div>Error: Không kết nối với Server ({hopLoi.message})</div>;
  // } else if (!coKetQuaChua) {
  //   return <div>Loading...</div>;
  // } else {
  //   return (
  //     <div>
  //       {cauTraLoiServer}
  //       {mauSang ?'A':'B'}
  //       {/* Đây là học sinh */}
  //     </div>
  //   );
  // }
}

export default HocSinh;