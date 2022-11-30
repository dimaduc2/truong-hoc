import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GiaoVien() {
  const [hopLoi, suaHopLoi] = useState(null);
  const [coKetQuaChua, suaCoKetQuaChua] = useState(false);
  const [items, setItems] = useState([]);

  const [cauTraLoiServer, suaCauTraLoiServer] = useState('');
  useEffect(() => {
    axios.get('http://localhost:5500/GiaoVien/')
    .then(res => {
      // alert(res.data)
      suaCauTraLoiServer(res.data);
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
        :<div>{cauTraLoiServer}</div>
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