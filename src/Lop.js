import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Accordion } from 'react-bootstrap';

function Lop({mauSang}) {
  const [hopLoi, suaHopLoi] = useState(null);
  const [coKetQuaChua, suaCoKetQuaChua] = useState(false);
  const [items, setItems] = useState([]);

  const [cauTraLoiServer, suaCauTraLoiServer] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5500/Lop/')
    .then(res => {
      // alert(res.data)
      suaCauTraLoiServer(res.data.danhSachBH);
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
              <th>Giáo viên Chủ Nhiệm</th>
              <th>Số học sinh</th>
            </tr>
          </thead>
          <tbody>
            {cauTraLoiServer.map((moiNguoi, index)=>
              <tr>
                <td>{moiNguoi.tenLop}</td>
                <td>{moiNguoi.tenGiaoVien}</td>
                <td>
                  <Accordion>
                    <Accordion.Item eventKey={index}>
                      <Accordion.Header>{moiNguoi.tongSoHS}</Accordion.Header>
                      <Accordion.Body>
                        {moiNguoi.tenTatCaHS}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      // <div>{cauTraLoiServer.map((moiNguoi, index)=>
      //     <div>
      //       {'Tên: '+moiNguoi.tenLop+' | GVChuNhiem: '+moiNguoi.tenGiaoVien+' | Khối lượng học sinh: '+moiNguoi.tongSoHS}
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
  //       {/* Đây là bài học */}
  //     </div>
  //   );
  // }
}

export default Lop;