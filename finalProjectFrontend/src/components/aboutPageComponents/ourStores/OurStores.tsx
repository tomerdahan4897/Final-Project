const OurStores = () => {
  return (
    <div className="d-flex flex-row justify-content-center flex-wrap align-items-center gap-3">
      <div className="d-flex flex-column justify-content-center flex-wrap align-items-center">
        <h3 className="m-3">Our Stores:</h3>

        <div className="d-flex flex-row justify-content-center flex-wrap align-items-start gap-2">
          <div>
            <h5 className="text-center">North</h5>
            <ul>
              <li>Hazorim 3, Kriyat Shemona</li>
              <li>Hameyasdim 7, Karmiel</li>
              <li>Haatzmaut 20, Haifa</li>
              <li>Yizchak Rabin 1, Afula</li>
            </ul>
          </div>

          <div>
            <h5 className="text-center">Center</h5>
            <ul>
              <li>Jabutinski 33, Petah Tikva</li>
              <li>Shuk Hakarmel, Tel Aviv</li>
              <li>Hamelacha 78, Holon</li>
              <li>Rotchiled 45, Rishon Letzion</li>
              <li>Avrahanm Avinu 1, Rehovot</li>
              <li>Jaffa 5, Jerusalem</li>
            </ul>
          </div>

          <div>
            <h5 className="text-center">South</h5>
            <ul>
              <li>Ariel Sharon 2, Beer Sheva</li>
              <li>Admonit 17, Eilat</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStores;
