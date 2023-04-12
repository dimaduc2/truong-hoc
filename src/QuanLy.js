import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';

function QuanLy({mauSang}) {
  const [hopLoi, suaHopLoi] = useState(null);
  const [coKetQuaChua, suaCoKetQuaChua] = useState(false);
  const [items, setItems] = useState([]);

  const [hocSinh_Id, suaHocSinh_Id] = useState('TatCaHS');
  const [hocSinh_Ten, suaHocSinh_Ten] = useState('TatCaHS');
  const chonHocSinh = (event) => {
    suaHocSinh_Id(event.target.value)
    // suaHocSinh_Ten(event.target.value)

    // alert(event.target.value)
    // axios.get('http://localhost:5500/QuanLy/chonTen1HS?HS_Id='+event.target.value)
    // .then(res => {
    //   suaDanhSachQL(res.data.danhSachQL);
    // })
  }
  
  const [tietHoc_Id, suaTietHoc_Id] = useState('TatCaTH');
  const [tietHoc_Ten, suaTietHoc_Ten] = useState('TatCaTH');
  const chonTietHoc = (event) => {
    suaTietHoc_Id(event.target.value)
    // suaTietHoc_Ten(event.target.value)
  }
  
  const themQL = () => {
    // alert('hocSinh_Id='+hocSinh_Id+'&tietHoc_Id='+tietHoc_Id)
    axios.post('http://localhost:5500/QuanLy/themHS_TH?hocSinh_Id='+hocSinh_Id+'&tietHoc_Id='+tietHoc_Id)
    .catch(function(error){
      if (error.response) {
        alert(error.response.data)
      }else if (error.request) {
        // Request đã được tạo ra nhưng không nhận được hồi đáp nào
        // Trong trình duyệt, `error.request` là instance của XMLHttpRequest
        // còn trong node.js thì nó là instance của http.ClientRequest
        alert('Không kết nối được Server');
      }
    })
    .then(res => {
      console.log(res.data)
      suaDanhSachQL(res.data.danhSachQL);
      var dangSuaDiemMoi = [...dangSuaDiem]
      dangSuaDiemMoi.push(false)
      suaDangSuaDiem(dangSuaDiemMoi)
    })
  }

  const xoaQL = (xoaQL_id) => {
    if(window.confirm('Có xóa Id: ' + xoaQL_id + ' không?')===true){
      axios.delete('http://localhost:5500/QuanLy/xoaHS_TH?QL_Id='+xoaQL_id)
      .catch(function(error){
        if (error.response) {
          alert(error.response.data)
        }else if (error.request) {
          alert('Không kết nối được Server');
        }
      })
      .then(res => {
        console.log(res.data)
        suaDanhSachQL(res.data.danhSachQL);
      })
    }
  }
  
  // const [diemTong, suaDiemTong] = useState([]);
  const [dangSuaDiem, suaDangSuaDiem] = useState([]);
  // const [dangSuaDiem, suaDangSuaDiem] = useState(false);
  const [nhanXetQL, suaNhanXetQL] = useState(null);
  const [diemQL1, suaDiemQL1] = useState(null);
  const [diemQL2, suaDiemQL2] = useState(null);
  const luuLenServer = (id, viTriODiem) => {
    var diem1 = diemQL1
    var diem2 = diemQL2
    var nhanXet = nhanXetQL

    var thongTin1HSTH = {
      diem1: diemQL1,
      diem2: diemQL2,
      nhanXet: nhanXetQL,
      QL_Id: id
    }

    if (isNaN(diemQL1) || isNaN(diemQL2)) {
      alert('Phải viết số không phải là chữ')
    }
    if(diemQL1<=100 && diemQL1>=0 && diemQL2<=100 && diemQL2>=0){
      // if(diem1===''){diem1 = null}
      // if(diem2===''){diem2 = null}
      // axios.put('http://localhost:5500/QuanLy/suaDiemHS?diemQL1='+diem1+'&diemQL2='+diem2+'&nhanXet='+nhanXet+'&QL_Id='+id)
      axios.put('http://localhost:5500/QuanLy/suaDiemHS', thongTin1HSTH)
      .then(res => {
        console.log(res.data)
        suaDanhSachQL(res.data.danhSachQL);
        var dangSuaDiemMoi = [...dangSuaDiem]
        dangSuaDiemMoi[viTriODiem] = false
        suaDangSuaDiem(dangSuaDiemMoi)
        // suaDiemTong(diemQL1+diemQL2)
      })
    }else{
      alert('Phải viết số nhỏ hơn hoặc bằng 100 và lớn hơn hoặc bằng 0')
    }
  }
  
  const hienOSua = (diem_1, diem_2, viTriODiem, nhanXetCu) => {
    // var dangSuaDiemMoi = [false, false, false, false, false, false, false, false, false, false]
    // Tạo Array mới, lấy toàn bộ của Array cũ, cho vào Array mới
    suaDiemQL1(diem_1)
    suaDiemQL2(diem_2)
    suaNhanXetQL(nhanXetCu)
    var dangSuaDiemMoi = [...dangSuaDiem]
    for (let i = 0; i < danhSachQL.length; i++){
      dangSuaDiemMoi[i] = false
    }
    // var dangSuaDiemMoi = []
    // for (let i = 0; i < danhSachQL.length; i++){
    //   dangSuaDiemMoi.push(false)
    // }

    dangSuaDiemMoi[viTriODiem] = true
    suaDangSuaDiem(dangSuaDiemMoi)
  }


  const [danhSachQL, suaDanhSachQL] = useState([]);
  const [danhSachHS, suaDanhSachHS] = useState([]);
  const [danhSachTH, suaDanhSachTH] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5500/QuanLy/')
    .then(res => {
      console.log(res.data)
      suaDanhSachQL(res.data.danhSachQL);
      suaDanhSachHS(res.data.danhSachHS);
      suaDanhSachTH(res.data.danhSachTH);
      var dangSuaDiemMoi = []
      for (let i = 0; i < res.data.danhSachQL.length; i++){
        dangSuaDiemMoi.push(false)
      }
      suaDangSuaDiem(dangSuaDiemMoi)
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
      <Table bgcolor='brown'>
        <tr>
          <th>
            <Form.Select aria-label="Default select example" onChange={(event) => chonHocSinh(event)}>
              <option value='TatCaHS'>Tất Cả Học sinh</option>
              {danhSachHS.map((moiHS, index)=>
                // <option value={moiHS.id}>{moiHS.ten}</option>
                <option value={moiHS.id}>{moiHS.ten}</option>
              )}
            </Form.Select>
          </th>
          <th>
            <Form.Select aria-label="Default select example" onChange={(event) => chonTietHoc(event)}>
              <option value='TatCaTH'>Tất cả tiết học</option>
              {danhSachTH.map((moiTH, index)=>
                <option value={moiTH.id}>{moiTH.ten}</option>
              )}
            </Form.Select>
          </th>
          <th><Button variant="primary" onClick={() => themQL()} disabled={(hocSinh_Id === 'TatCaHS' || tietHoc_Id === 'TatCaTH')?true:false}>
            Thêm
          </Button></th>
        </tr>
      </Table>
      
      {hopLoi
        ?<div>Error: Không kết nối với Server ({hopLoi.message})</div>
        :<Table style={{color: mauSang ?'white' :'black'}} striped={mauSang ?false :true} bordered>
          <thead>
            <tr>
              <th>Học sinh</th>
              <th>Tiết học</th>
              <th>Điểm 1</th>
              <th>Điểm 2</th>
              <th>Tổng điểm</th>
              <th>Nhận Xét</th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            {/* Cái này để giúp người ta biết làm thế nào hiện ra tất cả hay không
            {danhSachQL.map((moiNguoi, index)=>
              hocSinh_Ten === 'TatCaHS'
              ?'seretde'
              :null
            )} */}
            
            {danhSachQL.map((moiHS_TH, index)=>
              // nếu đúng là học sinh đã chọn    hoặc   Nếu chọn tất cả học sinh   thì ra true và hiện ra dòng này
              
              // cách 1 giống toán (2 + 3) x (1 + 4) = 25
              // (hocSinh_Ten === moiHS_TH.tenHocSinh || hocSinh_Ten === 'TatCaHS')
              // &&
              // (tietHoc_Ten === moiHS_TH.TenTietHoc || tietHoc_Ten === 'TatCaTH')
              (Number(hocSinh_Id) === moiHS_TH.hocSinh_id || hocSinh_Id === 'TatCaHS')
              &&
              (Number(tietHoc_Id) === moiHS_TH.tietHoc_id || tietHoc_Id === 'TatCaTH')

              // cách 2 giống toán 2 x 1 + 3 x 1 + 2 x 4 + 3 x 4 = 25
              // hocSinh_Ten === moiHS_TH.tenHocSinh && tietHoc_Ten === moiHS_TH.TenTietHoc
              //  || 
              // hocSinh_Ten === moiHS_TH.tenHocSinh && tietHoc_Ten === 'TatCaTH'
              //  || 
              // hocSinh_Ten === 'TatCaHS' && tietHoc_Ten === 'TatCaTH'
              //  ||
              // hocSinh_Ten === 'TatCaHS' && tietHoc_Ten === moiHS_TH.TenTietHoc
              ?
                <tr>
                  <td>{moiHS_TH.tenHocSinh} ({moiHS_TH.lop})
                  </td>
                  <td>{moiHS_TH.TenTietHoc}</td>
                  <td>{
                    dangSuaDiem[index]
                      ?<div>
                        <Form.Control onChange={(event) => suaDiemQL1(event.target.value)} value={diemQL1}  />
                      </div>                  
                      :<div>
                        <div>{moiHS_TH.diem_1}</div>
                      </div>
                  }</td>
                  <td>{
                    dangSuaDiem[index]
                      ?<div>
                        <Form.Control onChange={(event) => suaDiemQL2(event.target.value)} value={diemQL2} />
                      </div>                  
                      :<div>
                        <div>{moiHS_TH.diem_2}</div>
                      </div>
                  }</td>
                  <td>{moiHS_TH.diemTong}</td>
                  <td>{
                    dangSuaDiem[index]
                    ?<div>
                      <Form.Control as="textarea" rows={1} onChange={(event) => suaNhanXetQL(event.target.value)} value={nhanXetQL} />
                    </div>                  
                    :<div>
                      {moiHS_TH.nhanXet}
                    </div>
                  }</td>
                  <td>{
                    dangSuaDiem[index]
                    ?<div><Button onClick={()=>luuLenServer(moiHS_TH.id, index)}>Lưu</Button>
                    <Button style={{background: 'red'}} onClick={()=>xoaQL(moiHS_TH.id)}>X</Button></div>
                    :<Button onClick={()=>hienOSua(moiHS_TH.diem_1, moiHS_TH.diem_2, index, moiHS_TH.nhanXet)}>Sửa</Button>
                  }</td>
                </tr>
              :null
            )}
          </tbody>
        </Table>
      }
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
  //       {danhSachQL}
  //       {/* Đây là bài học */}
  //     </div>
  //   );
  // }
}

export default QuanLy;