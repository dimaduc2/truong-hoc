import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function GiaoVien({mauSang}) {
  const [hopLoi, suaHopLoi] = useState(null);
  const [coKetQuaChua, suaCoKetQuaChua] = useState(false);
  const [items, setItems] = useState([]);

  const [cauTraLoiServer, suaCauTraLoiServer] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5500/GiaoVien/')
    .then(res => {
      // alert(res.data)
      suaCauTraLoiServer(res.data.danhSachGV);
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
      {hopLoi
        ?<div>Error: Không kết nối với Server ({hopLoi.message})</div>
        :<Table style={{color: mauSang ?'white' :'black'}} striped={mauSang ?false :true} bordered>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Giới Tính</th>
              <th>Chủ Nhiệm lớp</th>
              <th>Tiết học</th>
            </tr>
          </thead>
          <tbody>
            {cauTraLoiServer.map((moiNguoi, index)=>
              <tr>
                <td>{moiNguoi.tengiaoVien}</td>
                <td>{(moiNguoi.gioiTinh===1?'Male':'Female')}</td>
                <td>{moiNguoi.quanlylop}</td>
                <td>{moiNguoi.tenTietHoc}</td>
              </tr>
            )}
          </tbody>
        </Table>
      // <div>{cauTraLoiServer.map((moiNguoi, index)=>
      //     <div>
      //       {'Tên: '+moiNguoi.tengiaoVien+' (Giới Tính: '+(moiNguoi.gioiTinh===1?'Male':'Female')+') | Quản lý lớp: '+(moiNguoi.quanlylop===null ?'Không có lớp' :moiNguoi.quanlylop)}
      //     </div>
      //   )}</div>
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
  //       {cauTraLoiServer}
  //       {/* Đây là giáo viên */}
  //     </div>
  //   );
  // }
}

export default GiaoVien;